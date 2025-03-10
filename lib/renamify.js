import {rename as _rename} from 'node:fs/promises';
import path from 'node:path';
import currify from 'currify';

const isString = (a) => typeof a === 'string';
const join = currify((a, b) => path.join(a, b));

export default async (dir, from, to, {rename = _rename} = {}) => {
    check(dir, from, to);
    
    const namesFrom = from.map(join(dir));
    const namesTo = to.map(join(dir));
    
    await renameFiles(namesFrom, namesTo, {rename});
};

async function renameFiles(namesFrom, namesTo, {rename}) {
    for (const [i, from] of namesFrom.entries()) {
        const to = namesTo[i];
        
        await rename(from, to);
    }
}

function check(dir, from, to) {
    if (!isString(dir))
        throw Error('dir should be a string!');
    
    if (!Array.isArray(from))
        throw Error('from should be an array!');
    
    if (!Array.isArray(to))
        throw Error('to should be an array!');
    
    if (from.length !== to.length)
        throw Error('Names lengths mismatch');
}
