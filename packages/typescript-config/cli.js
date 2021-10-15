#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');

const sourcePath = `${__dirname}/tsconfig.base.json`;
const destinationPath = `${process.cwd()}/tsconfig.base.json`;

try {
  if (!fs.existsSync(destinationPath)) {
    fs.writeFileSync(destinationPath, fs.readFileSync(sourcePath));
    console.log('✅  A "tsconfig.base.json" file was created. ');
  } else {
    const sourceContent = fs.readFileSync(sourcePath).toString();
    const destinationContent = fs.readFileSync(destinationPath).toString();
    if (destinationContent === sourceContent) {
      console.log('ℹ️  A "tsconfig.base.json" file already exists.');
    } else {
      console.log(
        '⚠️  A "tsconfig.base.json" file already exists but is configured differently.',
      );
      process.exitCode = -1;
    }
  }
} catch (error) {
  console.error(error);
  process.exitCode = -1;
}
