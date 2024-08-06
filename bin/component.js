#!/usr/bin/env node

import process from 'node:process';

import { Command } from 'commander';
import figlet from 'figlet';

console.log(figlet.textSync('Component Utils'));

const program = new Command();

program
  .version('1.0.0')
  .description('CLI for automating routine tasks with React components');

program
  .command('create <componentName> <componentType> [parentView]')
  .alias('c')
  .description(
    'Create a new component directory with .tsx, .styled.tsx, .stories.tsx, index.ts',
  )
  .action((componentName, componentType, parentView) => {
    console.log('Test', componentName, componentType, parentView);
  });

program.parse(process.argv);
