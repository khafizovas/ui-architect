#!/usr/bin/env node

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

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
    console.log('Test', 'params', componentName, componentType, parentView);

    if (!['ui', 'views', 'components'].includes(componentType)) {
      console.error(
        'Invalid componentType!',
        componentType,
        'is not one of ["ui", "views", "components"]',
      );

      return;
    }

    if (componentType === 'components' && !parentView) {
      console.error(
        'Component with type of "component" must have "parentView" param',
      );

      return;
    }

    const componentPath = path.join(
      process.cwd(),
      'src',
      parentView ?? '',
      componentType,
      componentName,
    );

    if (fs.existsSync(componentPath)) {
      console.error(
        `Component ${componentName} already exists in ${componentPath}!`,
      );

      return;
    }

    fs.mkdirSync(componentPath, { recursive: true });

    const componentFileContent = `import type { ${componentName}Props } from './types';

export const ${componentName} = (props: ${componentName}Props ) => {
  return (
    <div>
      ${componentName}
    </div>
  );
};`;

    fs.writeFileSync(
      path.join(componentPath, `${componentName}.tsx`),
      componentFileContent,
    );

    console.log(
      `Component ${componentName} created successfully in ${componentPath}!`,
    );
  });

program.parse(process.argv);
