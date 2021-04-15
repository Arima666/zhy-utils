const { execSync } = require('child_process');
const { join } = require('path');

module.exports = () => {
  let output;
  const script = join(__dirname, './../../node_modules/.bin/lerna');
  try {
    output = execSync(`${script} changed --json --loglevel silent`, {
      encoding: 'utf-8'
    });
  } catch (error) {
    throw new Error(
      'No local packages have changed since the last tagged releases.'
    );
  }
  return JSON.parse(output);
};
