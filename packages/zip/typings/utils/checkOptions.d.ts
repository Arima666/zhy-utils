import { ZipOptions } from '..';
export declare function throwErr(tips: string): void;
declare const checkOptions: {
    [key in keyof ZipOptions]: (val?: any) => void;
};
export default checkOptions;
