import commander from 'commander';
import { ZipOptions } from '..';
declare const Options: {
    [key in keyof ZipOptions]: commander.Option;
};
export default Options;
