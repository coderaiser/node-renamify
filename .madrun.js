import {run} from 'madrun';

export default {
    'test': () => `tape 'test/*.js'`,
    'watcher': () => 'nodemon -w test -w lib --exec',
    'watch:test': () => run('watcher', 'npm test'),
    'watch:coverage': () => run('watcher', 'npm run coverage'),
    'fix:lint': () => run('lint', '--fix'),
    'lint': () => 'putout .',
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
};
