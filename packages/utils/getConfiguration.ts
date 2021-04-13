import findUp from 'find-up';
import path from 'path';
import { readFileSync } from 'fs';

export default function getConfiguration(packageName: string, files: string[]) {
  let config = {};
  const configPath = findUp.sync(files);
  if (!configPath) {
    return config;
  }
  if (path.extname(configPath) === '.js') {
    const jsConfiguration = require(configPath);
    if (typeof jsConfiguration === 'function') {
      config = jsConfiguration();
    } else {
      config = jsConfiguration;
    }
  } else {
    config = JSON.parse(readFileSync(configPath, { encoding: 'utf-8' }));
  }

  if (typeof config !== 'object') {
    throw Error(
      `[${packageName}] Invalid configuration in ${configPath} provided. Expected an object but found ${typeof config}.`
    );
  }

  return config;
}
