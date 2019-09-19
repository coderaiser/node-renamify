'use strict';

const path = require('path');
const fs = require('fs');

const test = require('supertape');
const tryToCatch = require('try-to-catch');
const {reRequire} = require('mock-require');
const renamify = require('..');

const empty = () => {};

test('renamify: arguments: no', async (t) => {
    const [e] = await tryToCatch(renamify);
    t.equal(e.message, 'dir should be a string!', 'should throw when no fn');
    t.end();
});

test('renamify: arguments: from', async (t) => {
    const [e] = await tryToCatch(renamify, '/');
    
    t.equal(e.message, 'from should be an array!', 'should throw when no from');
    t.end();
});

test('renamify: arguments: to', async (t) => {
    const [e] = await tryToCatch(renamify, '/', []);
    
    t.equal(e.message, 'to should be an array!', 'should throw when no to');
    t.end();
});

test('renamify: arguments: names length mismatch', async (t) => {
    const error = Error('Names lengths mismatch');
    const [e] = await tryToCatch(renamify, '/', ['a'], []);
    
    t.deepEqual(e, error, 'should call fn with error');
    t.end();
});

test('renamify: names length is zero', async (t) => {
    const [e] = await tryToCatch(renamify, '/', [], []);
    
    t.notOk(e, 'should not be error');
    t.end();
});

test('renamify: rename: from', async (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        t.equal(name, from, 'should rename file');
        fs.rename = rename;
        fn();
        t.end();
    };
    
    const renamify = reRequire('..');
    await renamify('', [name], [newName], empty);
});

test('renamify: rename: to', async (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        t.equal(newName, to, 'should rename file');
        fs.rename = rename;
        fn();
        t.end();
    };
    
    const renamify = reRequire('..');
    await renamify('', [name], [newName], empty);
});

test('renamify: rename: fn', async (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        fs.rename = rename;
        fn();
    };
    
    const renamify = reRequire('..');
    await renamify('/', [name], [newName]);
    
    t.pass('should call fn after renaming');
    t.end();
});

test('renamify: rename: fn', async (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        fs.rename = rename;
        fn();
    };
    
    const renamify = reRequire('..');
    renamify('/', [name], [newName]);
    
    t.pass('should call fn after renaming');
    t.end();
});

test('renamify: rename: error', async (t) => {
    const name = 'a';
    const newName = 'b';
    
    const msg = `ENOENT: no such file or directory, rename 'a' -> 'b'`;
    const [e] = await tryToCatch(renamify, '', [name], [newName]);
    
    t.equal(msg, e.message, 'should call fn with error');
    t.end();
});

test('renamify: rename', async (t) => {
    const {join} = path;
    const names = [
        'a.txt',
        'b.txt',
    ];
    
    const newNames = [
        'c.txt',
        'd.txt',
    ];
    
    const dir = join(__dirname, 'fixture', 'two');
    const namesFrom = names.map((name) => join(dir, name));
    const namesTo = newNames.map((name) => join(dir, name));
    
    await renamify(dir, names, newNames);
    const list = fs.readdirSync(dir);
    
    t.deepEqual(list, newNames, 'should rename files');
    
    namesTo.forEach((name, i) => {
        fs.renameSync(name, namesFrom[i]);
    });
    
    t.end();
});

