'use strict';

const localCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(localCli(), 'Hello from localCli');
console.info('localCli tests passed');
