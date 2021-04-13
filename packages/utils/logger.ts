import chalk from 'chalk';
import figures from 'figures';

const error = (...text) => console.log(chalk.bold.red(figures.cross, ...text));

const warning = (...text) =>
  console.log(chalk.keyword('orange')(figures.info, ...text));

const info = (...text) => console.log(chalk.cyan(figures.info, ...text));

const success = (...text) => console.log(chalk.green(figures.tick, ...text));

const logger = {
  error,
  warning,
  info,
  success
};

export default logger;
