import * as fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

(async () => {
  const content = await readFile("package.json");
  console.log(content);
})();
