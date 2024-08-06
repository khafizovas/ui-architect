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
  .command('create <componentName> <ComponentDirectory> [parentView]')
  .alias('c')
  .description(
    'Create a new component directory with .tsx, .styled.tsx, .stories.tsx, index.ts',
  )
  .action((componentName, ComponentDirectory, parentView) => {
    console.log(
      'Test',
      'params',
      componentName,
      ComponentDirectory,
      parentView,
    );

    if (!['ui', 'views', 'components'].includes(ComponentDirectory)) {
      console.error(
        'Invalid component directory!',
        ComponentDirectory,
        'is not one of ["ui", "views", "components"]',
      );

      return;
    }

    if (ComponentDirectory === 'components' && !parentView) {
      console.error(
        'Component with type of "component" must have "parentView" param',
      );

      return;
    }

    const parentPath = path.join(
      process.cwd(),
      'src',
      parentView ? `views/${parentView}` : '',
      ComponentDirectory,
    );

    const componentPath = path.join(parentPath, componentName);

    if (fs.existsSync(componentPath)) {
      console.error(
        `Component ${componentName} already exists in ${componentPath}!`,
      );

      return;
    }

    fs.mkdirSync(componentPath, { recursive: true });

    const componentFileContent = `import type { ${componentName}Props } from './types';
import { Container } from './${componentName}.styled';

export const ${componentName} = (props: ${componentName}Props) => {
  console.log('Test', '${componentName}', props);

  return (
    <Container>
      ${componentName}
    </Container>
  );
};
`;

    const typesFileContent = `export type ${componentName}Props = {};
`;

    const stylesFileContent = `import styled from 'styled-components';

export const Container = styled.div\`\`;
`;

    const snakeCaseComponentName = componentName
      .replace(/[A-Z]/g, (letter) => `_${letter}`)
      .slice(1)
      .toUpperCase();

    const storiesFileContent = `import { ${componentName} } from './${componentName}';
import { ${snakeCaseComponentName}_PROPS_MOCK } from './fixtures';

export default {
  component: ${componentName},
  title: '${[parentView ? `views/${parentView}` : undefined, ComponentDirectory, componentName].filter((elem) => Boolean(elem)).join('/')}',
  tags: ['autodocs'],
};

export const Desktop = {
  args: {
    ...${snakeCaseComponentName}_PROPS_MOCK,
  },
};

export const Mobile = {
  args: {
    ...${snakeCaseComponentName}_PROPS_MOCK,
    isMobile: true,
  },
};
`;

    const fixturesFileContent = `import { ${componentName}Props } from './types';

export const ${snakeCaseComponentName}_PROPS_MOCK: ${componentName}Props = {} as const;
`;

    const indexFileContent = `export { ${componentName} } from './${componentName}';
`;

    fs.writeFileSync(
      path.join(componentPath, `${componentName}.tsx`),
      componentFileContent,
    );

    fs.writeFileSync(path.join(componentPath, 'types.ts'), typesFileContent);

    fs.writeFileSync(
      path.join(componentPath, `${componentName}.styled.tsx`),
      stylesFileContent,
    );

    fs.writeFileSync(path.join(componentPath, 'index.ts'), indexFileContent);

    fs.appendFileSync(path.join(parentPath, 'index.ts'), indexFileContent);

    if (ComponentDirectory !== 'views') {
      fs.writeFileSync(
        path.join(componentPath, `${componentName}.stories.tsx`),
        storiesFileContent,
      );

      fs.writeFileSync(
        path.join(componentPath, 'fixtures.ts'),
        fixturesFileContent,
      );
    }

    console.log(
      `Component ${componentName} created successfully in ${componentPath}!`,
    );
  });

program.parse(process.argv);
