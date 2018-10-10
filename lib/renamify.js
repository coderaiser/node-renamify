'use strict';

const {promisify} = require('util');

const fs = require('fs');
const path = require('path');
const currify = require('currify');

const rename = promisify(fs.rename);
const join = currify((a, b) => path.join(a, b));

module.exports = async (dir, from, to) => {
    check(dir, from, to);
    
    const namesFrom = from.map(join(dir));
    const namesTo = to.map(join(dir));
    
    await renameFiles(namesFrom, namesTo);
};

async function renameFiles(namesFrom, namesTo) {
    const n = namesFrom.length;
    
    for (let i = 0; i < n; i++) {
        const from = namesFrom[i];
        const to = namesTo[i];
        
        await rename(from, to);
    }
}

function check(dir, from, to) {
    if (typeof dir !== 'string')
        throw Error('dir should be a string!');
    
    if (!Array.isArray(from))
        throw Error('from should be an array!');
    
    if (!Array.isArray(to))
        throw Error('to should be an array!');
    
    if (from.length !== to.length)
        throw Error('Names lengths mismatch');
}

