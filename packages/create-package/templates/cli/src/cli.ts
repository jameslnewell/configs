import {hello} from './index.js';

const name = process.argv[2] ?? 'world';
process.stdout.write(`${hello(name)}\n`);
