
export interface ParsedError {
    errorName: string | null;
    appId: string;
    name?: string;
    email?: string;
    id?: string;
    timeInEpochMilliseconds: number;
    angularRoute: string;
    message: string;
    stackFrames: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedStackInfo?: any;
    originalErrorStack: string;
}