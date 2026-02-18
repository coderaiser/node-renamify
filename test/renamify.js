import path, {dirname} from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import test, {stub} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import renamify from '../lib/renamify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const name = 'a';
    const newName = 'b';
    const rename = stub();
    
    await renamify('', [name], [newName], {
        rename,
    });
    
    t.calledWith(rename, [name, newName]);
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
    
    for (const [i, name] of namesTo.entries()) {
        fs.renameSync(name, namesFrom[i]);
    }
    
    t.end();
});

test('renamify: rename: full', async (t) => {
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
    
    await renamify(dir, namesFrom, namesTo, {
        full: true,
    });
    const list = fs.readdirSync(dir);
    
    t.deepEqual(list, newNames, 'should rename files');
    
    for (const [i, name] of namesTo.entries()) {
        fs.renameSync(name, namesFrom[i]);
    }
    
    t.end();
});
