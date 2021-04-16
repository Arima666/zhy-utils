export declare type ZipOptions = {
    path?: string;
    compression?: 'STORE' | 'DEFLATE';
    compressLevel?: number;
    mimeType?: string;
    platform?: 'DOS' | 'UNIX';
    name?: string;
    firstDirName?: string;
};
