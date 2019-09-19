'use strict';

const {
    run
} = require('madrun');

module.exports = {
    "test": () => 'tape test/*.js',
    "watcher": () => 'nodemon -w test -w lib --exec',
    "watch:test": () => run('watcher', 'npm test'),
    "watch:coverage": () => run('watcher', 'npm run coverage'),
    'fix:lint': () => run('lint', '--fix'),
    'lint': () => 'putout lib test madrun.js',
    "coverage": () => 'nyc npm test',
    "report": () => 'nyc report --reporter=text-lcov | coveralls'
};

