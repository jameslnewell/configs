const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

(async () => {
  const content = await readFile('package.json');
  console.log(content);
})();
