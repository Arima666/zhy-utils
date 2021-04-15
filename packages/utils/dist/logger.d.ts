declare const logger: {
    error: (...text: any[]) => void;
    warning: (...text: any[]) => void;
    info: (...text: any[]) => void;
    success: (...text: any[]) => void;
};
export default logger;
