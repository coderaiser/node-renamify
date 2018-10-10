'use strict';

const fs = require('fs');
const path = require('path');

const itchy = require('itchy');
const currify = require('currify');

const addDir = currify((dir, name) => {
    return path.join(dir, name);
});

module.exports = (dir, from, to, fn) => {
    check(dir, from, to, fn);
    
    if (from.length !== to.length)
        return fn(Error('Names lengths mismatch'));
    
    const namesFrom = from.map(addDir(dir));
    const namesTo = to.map(addDir(dir));
    
    itchy(namesFrom, rename(namesTo), fn);
};

function rename(namesTo) {
    let i = -1;
    
    return (name, fn) => {
        fs.rename(name, namesTo[++i], fn);
    };
}


function check(dir, from, to, fn) {
    if (typeof dir !== 'string')
        throw Error('dir should be a string!');
    
    if (!Array.isArray(from))
        throw Error('from should be an array!');
    
    if (!Array.isArray(to))
        throw Error('to should be an array!');
    
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

