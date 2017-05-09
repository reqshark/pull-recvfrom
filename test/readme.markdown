# build and test [![Build Status](https://travis-ci.org/reqshark/sendto.svg?branch=master)](https://travis-ci.org/reqshark/sendto)

`test/index.js` file runs the tests by iterating over the required contents
within this directory.

from root directory, you can do `npm t` or pipe the process to tap-spec
```bash
$ node test | tap-spec

# equivalent:
$ npm t
```
