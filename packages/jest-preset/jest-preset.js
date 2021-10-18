const {getPackagesSync} = require('@manypkg/get-packages');
const {root, packages} = getPackagesSync(process.cwd());

module.exports = {
  testMatch: [
    `${root.dir}/(src|test)/**/*.test?(s).ts?(x)`,
    ...packages.map(
      (workspace) => `${workspace.dir}/(src|test)/**/*.test?(s).ts?(x)`,
    ),
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
