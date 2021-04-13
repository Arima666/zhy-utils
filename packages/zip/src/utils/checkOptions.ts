import { InvalidOptionArgumentError } from 'commander';
import { is } from '../../../utils';

function throwErr(tips: string) {
  throw new InvalidOptionArgumentError(tips);
}

function checkPath(val?: string) {
  if (!val) throwErr('Path is required');
  if (!is.str(val)) throwErr('Path should be a string');

  return val;
}

function checkCompression(val?: string) {
  if (val) {
    if (!['STORE', 'DEFLATE'].includes(val))
      throwErr('Compression should be STORE or DEFLATE');
  }

  return val;
}

function checkLevel(val?: string) {
  if (val) {
    const level = Number(val);
    if (!is.num(level)) throwErr('CompressLevel should be a number');
    if (level < 1 || level > 9) throwErr('CompressLevel should between 1 to 9');

    return level;
  }

  return val;
}

const checkOptions = {
  path: checkPath,
  compression: checkCompression,
  compressLevel: checkLevel
};

export default checkOptions;
