import {readFile} from 'node:fs/promises';

(async () => {
  const content = await readFile('package.json');
  console.log(content);
})();
