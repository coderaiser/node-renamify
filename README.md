# Renamify [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[BuildStatusURL]: https://github.com/coderaiser/node-renamify/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/node-renamify/workflows/Node%20CI/badge.svg
[NPMIMGURL]: https://img.shields.io/npm/v/renamify.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/renamify "npm"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/node-renamify?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/node-renamify/badge.svg?branch=master&service=github

Rename group of files from a directory.

## Install

```
npm i renamify --save
```

## API

```js
import renamify from 'renamify';

const dir = '/';
const from = ['bin'];

const to = ['super-bin'];

await renamify(dir, from, to);
```

Or with ``try-to-catch`:

```js
import renamify from 'renamify';
import tryToCatch from 'try-to-catch';

const dir = '/';
const from = ['bin'];

const to = ['super-bin'];

const [error] = await tryToCatch(renamify, dir, from, to);

console.log(error || 'done');
```

## Related

- [renamify-cli](https://github.com/coderaiser/node-renamify-cli "renamify-cli") - CLI rename group of files from a directory.

## License

MIT
