import chalk from 'chalk';
import figures from 'figures';

const error = (...text: any[]) =>
  console.log(chalk.bold.red(figures.cross, ...text));

const warning = (...text: any[]) =>
  console.log(chalk.keyword('orange')(figures.info, ...text));

const info = (...text: any[]) => console.log(chalk.cyan(figures.info, ...text));

const success = (...text: any[]) =>
  console.log(chalk.green(figures.tick, ...text));

const logger = {
  error,
  warning,
  info,
  success
};

export default logger;
