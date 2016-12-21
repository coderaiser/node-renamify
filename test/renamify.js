'use strict';

const test = require('tape');
const renamify = require('..');

const path = require('path');
const fs = require('fs');

const empty = () => {};

test('renamify: arguments: no', (t) => {
    t.throws(renamify, /dir should be a string!/, 'should throw when no fn');
    t.end();
});

test('renamify: arguments: from', (t) => {
    const fn = () => renamify('/');
    
    t.throws(fn, /from should be an array!/, 'should throw when no from');
    t.end();
});

test('renamify: arguments: to', (t) => {
    const fn = () => renamify('/', []);
    
    t.throws(fn, /to should be an array!/, 'should throw when no to');
    t.end();
});

test('renamify: arguments: fn', (t) => {
    const fn = () => renamify('/', [], []);
    
    t.throws(fn, /fn should be a function!/, 'should throw when no fn');
    t.end();
});

test('renamify: arguments: names length mismatch', (t) => {
    const error = Error('Names lengths mismatch');
    
    renamify('/', ['a'], [], (e) => {
        t.deepEqual(e, error, 'should call fn with error');
        t.end();
    });
});

test('renamify: names length is zero', (t) => {
    renamify('/', [], [], () => {
        t.pass('should call callback');
        t.end();
    });
});

test('renamify: rename: from', (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        t.equal(name, from, 'should rename file');
        fs.rename = rename;
        fn();
        t.end();
    };
    
    renamify('', [name], [newName], empty);
});

test('renamify: rename: to', (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        t.equal(newName, to, 'should rename file');
        fs.rename = rename;
        fn();
        t.end();
    };
    
    renamify('', [name], [newName], empty);
});

test('renamify: rename: fn', (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        fs.rename = rename;
        fn();
    };
    
    renamify('/', [name], [newName], () => {
        t.pass('should call fn after renaming');
        t.end();
    });
});

test('renamify: rename: fn', (t) => {
    const {rename} = fs;
    const name = 'a';
    const newName = 'b';
    
    fs.rename = (from, to, fn) => {
        fs.rename = rename;
        fn();
    };
    
    renamify('/', [name], [newName], () => {
        t.pass('should call fn after renaming');
        t.end();
    });
});

test('renamify: rename: error', (t) => {
    const name = 'a';
    const newName = 'b';
    
    const msg = `ENOENT: no such file or directory, rename 'a' -> 'b'`;
    renamify('', [name], [newName], (e) => {
        t.equal(msg, e.message, 'should call fn with error');
        t.end();
    });
});

test('renamify: rename', (t) => {
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
    
    renamify(dir, names, newNames, () => {
        const list = fs.readdirSync(dir);
        
        t.deepEqual(list, newNames, 'should rename files');
        
        namesTo.forEach((name, i) => {
            fs.renameSync(name, namesFrom[i]);
        });
        
        t.end();
    });
});

