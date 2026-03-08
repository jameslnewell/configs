const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

(async () => {
  await Promise.resolve();
  const content = await readFile('package.json');
  console.log(content);
})();
