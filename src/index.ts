#!/usr/bin/env node

import commander from 'commander';
import { attachAt } from './lib';
import { version } from '../package.json';

commander
  .version(version, '-v, --version');

attachAt(commander);

if (process.argv.length <= 2) commander.help();
else commander.parse(process.argv);
