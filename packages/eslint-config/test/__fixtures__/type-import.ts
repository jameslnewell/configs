import {ParsedPath, parse} from 'node:path';

const parsed: ParsedPath = parse('/tmp/file.txt');
console.log(parsed.name);
