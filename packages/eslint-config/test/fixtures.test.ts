import {ESLint} from 'eslint';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('ESLint fixtures', () => {
  it('should pass on sample.js', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([
      resolve(__dirname, '__fixtures__/sample.js'),
    ]);
    const hasErrors = results.some(
      (result) => result.errorCount > 0 || result.warningCount > 0,
    );
    expect(hasErrors).toBe(false);
  });

  it('should fail on sample.ts', async () => {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([
      resolve(__dirname, '__fixtures__/sample.ts'),
    ]);
    const hasErrors = results.some(
      (result) => result.errorCount > 0 || result.warningCount > 0,
    );
    expect(hasErrors).toBe(true);
  });
});
