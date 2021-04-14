import { InvalidOptionArgumentError } from 'commander';
import { ZipOptions } from '..';
import { COMPRESSION, COMPRESS_LEVEL, PLATFORM } from '../configs';
import is from './is';

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
    if (!COMPRESSION.includes(val))
      throwErr(
        `Compression is invalid. Allowed choices are ${COMPRESSION.join(', ')}.`
      );
  }

  return val;
}

function checkLevel(val?: string) {
  if (val) {
    if (!COMPRESS_LEVEL.includes(val))
      throwErr('CompressLevel should between 1 to 9');

    return Number(val);
  }

  return val;
}

function checkMimeType(val?: string) {}

function checkPlatform(val?: string) {
  if (val) {
    if (!PLATFORM.includes(val))
      throwErr(
        `Platform is invalid. Allowed choices are ${PLATFORM.join(', ')}.`
      );
  }

  return val;
}

function checkName(val?: any) {
  if (val) {
    if (/[?\\/:*<>|"]/g.test(val))
      throwErr('Name is invalid. Should not have ?\\/:*<>|"');
  }

  return val;
}

function checkFirstDirName(val?: any) {
  if (val) {
    if (/[?\\/:*<>|"]/g.test(val))
      throwErr('FirstDirName is invalid. Should not have ?\\/:*<>|"');
  }

  return val;
}

const checkOptions: {
  [key in keyof ZipOptions]: (val?: any) => any;
} = {
  path: checkPath,
  compression: checkCompression,
  compressLevel: checkLevel,
  // mimeType: checkMimeType,
  platform: checkPlatform,
  name: checkName,
  firstDirName: checkFirstDirName
};

export default checkOptions;
