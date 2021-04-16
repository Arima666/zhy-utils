import { ZipOptions } from '..';
declare const checkOptions: {
    [key in keyof ZipOptions]: (val?: any) => any;
};
export default checkOptions;
