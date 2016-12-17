'use strict';

const fs = require('fs');
const path = require('path');

const itchy = require('itchy/legacy');
const currify = require('currify/legacy');

const addDir = currify((dir, name) => {
    return path.join(dir, name);
});

module.exports = (dir, names, newNames, fn) => {
    check(dir, names, newNames, fn);
    
    if (names.length !== newNames.length)
        return fn(Error('Names lengths mismatch'));
    
    const namesFrom = names.map(addDir(dir));
    const namesTo = newNames.map(addDir(dir));
    
    itchy(namesFrom, rename(namesTo), fn);
};

function rename(namesTo) {
    let i = -1;
    
    return (name, fn) => {
        fs.rename(name, namesTo[++i], fn);
    };
}


function check(dir, names, newNames, fn) {
    if (typeof dir !== 'string')
        throw Error('dir should be a string!');
    
    if (!Array.isArray(names))
        throw Error('names should be an array!');
    
    if (!Array.isArray(newNames))
        throw Error('newNames should be an array!');
    
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

