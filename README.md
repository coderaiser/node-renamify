# Renamify [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Rename group of files from a directory.

## Install

`npm i renamify --save`

## API

```js
const renamify = require('renamify');

const dir = '/';
const from = [
    'bin'
];

const to = [
    'super-bin'
];

renamify(dir, from, to, (error) => {
    console.log(error || 'done');
});
```

## Environments

In old `node.js` environments that not fully supports `es2015`, `renamify` could be used with:

```js
var renamify = require('renamify/legacy');
```

## Related

- [renamify-cli](https://github.com/coderaiser/node-renamify-cli "renamify-cli") - CLI rename group of files from a directory.

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/renamify.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/node-renamify/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/node-renamify.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/renamify "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/node-renamify  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/node-renamify "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/node-renamify?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/node-renamify/badge.svg?branch=master&service=github

