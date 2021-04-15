const prettier = require('prettier');
const path = require('path');
const { readFileSync } = require('fs');

const config = JSON.parse(
  readFileSync(path.join(__dirname, './../../.prettierrc'), 'utf-8')
);

module.exports = (code, parser = 'babel') => {
  return prettier.format(code, Object.assign(config, { parser }));
};
