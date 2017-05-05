// Type definitions for Dropzone 4.3.0
// Project: http: //www.dropzonejs.com/
// Definitions: https: //github.com/DefinitelyTyped/DefinitelyTyped

interface DropzoneResizeInfo {
    srcX?: number;
    srcY?: number;
    trgX?: number;
    trgY?: number;
    srcWidth?: number;
    srcHeight?: number;
    trgWidth?: number;
    trgHeight?: number;
    optWidth?: number;
    optHeight?: number;
}

interface DropzoneFile extends File {
    previewElement: HTMLElement;
    previewTemplate: HTMLElement;
    previewsContainer: HTMLElement;
    status: string;
    accepted: boolean;
    xhr: XMLHttpRequest;
}

interface DropzoneOptions {
    url?: string;
    method?: string;
    withCredentials?: boolean;
    parallelUploads?: number;
    uploadMultiple?: boolean;
    maxFilesize?: number;
    paramName?: string;
    createImageThumbnails?: boolean;
    maxThumbnailFilesize?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    filesizeBase?: number;
    maxFiles?: number;
    params?: {};
    headers?: {};
    clickable?: boolean|string|HTMLElement|(string|HTMLElement)[];
    ignoreHiddenFiles?: boolean;
    acceptedFiles?: string;
    autoProcessQueue?: boolean;
    autoQueue?: boolean;
    addRemoveLinks?: boolean;
    previewsContainer?: boolean|string|HTMLElement;
    hiddenInputContainer?: HTMLElement;
    capture?: string;

    dictDefaultMessage?: string;
    dictFallbackMessage?: string;
    dictFallbackText?: string;
    dictFileTooBig?: string;
    dictInvalidFileType?: string;
    dictResponseError?: string;
    dictCancelUpload?: string;
    dictCancelUploadConfirmation?: string;
    dictRemoveFile?: string;
    dictRemoveFileConfirmation?: string;
    dictMaxFilesExceeded?: string;
    previewTemplate?: string;
    forceFallback?: boolean;

    renameFilename?(name: string): string;
    accept?(file: DropzoneFile, done: (error?: string|Error) => void): void;
    init?(): void;
    
    fallback?(): void;
    resize?(file: DropzoneFile): DropzoneResizeInfo;

    drop?(e: DragEvent): void;
    dragstart?(e: DragEvent): void;
    dragend?(e: DragEvent): void;
    dragenter?(e: DragEvent): void;
    dragover?(e: DragEvent): void;
    dragleave?(e: DragEvent): void;
    paste?(e: DragEvent): void;

    reset?(): void;

    addedfile?(file: DropzoneFile): void;
    addedfiles?(files: DropzoneFile[]): void;
    removedfile?(file: DropzoneFile): void;
    thumbnail?(file: DropzoneFile, dataUrl: string): void;

    error?(file: DropzoneFile, message: string|Error, xhr: XMLHttpRequest): void;
    errormultiple?(files: DropzoneFile[], message: string|Error, xhr: XMLHttpRequest): void;

    processing?(file: DropzoneFile): void;
    processingmultiple?(files: DropzoneFile[]): void;

    uploadprogress?(file: DropzoneFile, progress: number, bytesSent: number): void;
    totaluploadprogress?(totalProgress: number, totalBytes: number, totalBytesSent: number): void;

    sending?(file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData): void;
    sendingmultiple?(files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData): void;

    success?(file: DropzoneFile, response: Object|string): void;
    successmultiple?(files: DropzoneFile[], responseText: string): void;

    canceled?(file: DropzoneFile): void;
    canceledmultiple?(file: DropzoneFile[]): void;

    complete?(file: DropzoneFile): void;
    completemultiple?(file: DropzoneFile[]): void;

    maxfilesexceeded?(file: DropzoneFile): void;
    maxfilesreached?(files: DropzoneFile[]): void;
    queuecomplete?(): void;
}

declare class Dropzone {

    public static autoDiscover: boolean;
    public static options: any;
    public options: DropzoneOptions;
    public static confirm: (question: string, accepted: () => void, rejected?: () => void) => void;

    public static ADDED: string;
    public static QUEUED: string;
    public static ACCEPTED: string;
    public static UPLOADING: string;
    public static PROCESSING: string;
    public static CANCELED: string;
    public static ERROR: string;
    public static SUCCESS: string;

    public files: DropzoneFile[];

    public enable(): void;

    public disable(): void;

    public destroy(): Dropzone;

    public addFile(file: DropzoneFile): void;

    public removeFile(file: DropzoneFile): void;

    public removeAllFiles(cancelIfNecessary?: boolean): void;

    public processQueue(): void;

    public cancelUpload(file: DropzoneFile): void;

    public processFiles(files: DropzoneFile[]): void;

    public processFile(file: DropzoneFile): void;

    public uploadFile(file: DropzoneFile): void;

    public getAcceptedFiles(): DropzoneFile[];

    public getRejectedFiles(): DropzoneFile[];

    public getQueuedFiles(): DropzoneFile[];

    public getUploadingFiles(): DropzoneFile[];

    public accept(file: DropzoneFile, done: (error?: string|Error) => void): void;

    public getActiveFiles(): DropzoneFile[];

    public getFilesWithStatus(status: string): DropzoneFile[];

    public enqueueFile(file: DropzoneFile): void;

    public enqueueFiles(file: DropzoneFile[]): void;

    public createThumbnail(file: DropzoneFile, callback?: (...args: any[]) => void): any;

    public createThumbnailFromUrl(file: DropzoneFile, url: string, callback?: (...args: any[]) => void): any;

    public on(eventName: string, callback: (...args: any[]) => void): Dropzone;

    public off(eventName: string): Dropzone;

    public emit(eventName: string, ...args: any[]): Dropzone;

    public on(eventName: 'drop', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'dragstart', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'dragend', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'dragenter', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'dragover', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'dragleave', callback: (e: DragEvent) => any): Dropzone;
    public on(eventName: 'paste', callback: (e: DragEvent) => any): Dropzone;

    public on(eventName: 'reset'): Dropzone;

    public on(eventName: 'addedfile', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'addedfiles', callback: (files: DropzoneFile[]) => any): Dropzone;
    public on(eventName: 'removedfile', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'thumbnail', callback: (file: DropzoneFile, dataUrl: string) => any): Dropzone;

    public on(eventName: 'error', callback: (file: DropzoneFile, message: string|Error) => any): Dropzone;
    public on(eventName: 'errormultiple', callback: (files: DropzoneFile[], message: string|Error) => any): Dropzone;

    public on(eventName: 'processing', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'processingmultiple', callback: (files: DropzoneFile[]) => any): Dropzone;

    public on(eventName: 'uploadprogress', callback: (file: DropzoneFile, progress: number, bytesSent: number) => any): Dropzone;
    public on(
        eventName: 'totaluploadprogress',
        callback: (totalProgress: number, totalBytes: number, totalBytesSent: number) => any
    ): Dropzone;

    public on(eventName: 'sending', callback: (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => any): Dropzone;
    public on(eventName: 'sendingmultiple', callback: (files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => any): Dropzone;

    public on(eventName: 'success', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'successmultiple', callback: (files: DropzoneFile[]) => any): Dropzone;

    public on(eventName: 'canceled', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'canceledmultiple', callback: (file: DropzoneFile[]) => any): Dropzone;

    public on(eventName: 'complete', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'completemultiple', callback: (file: DropzoneFile[]) => any): Dropzone;

    public on(eventName: 'maxfilesexceeded', callback: (file: DropzoneFile) => any): Dropzone;
    public on(eventName: 'maxfilesreached', callback: (files: DropzoneFile[]) => any): Dropzone;
    public on(eventName: 'queuecomplete'): Dropzone;

    public emit(eventName: 'drop', e: DragEvent): Dropzone;
    public emit(eventName: 'dragstart', e: DragEvent): Dropzone;
    public emit(eventName: 'dragend', e: DragEvent): Dropzone;
    public emit(eventName: 'dragenter', e: DragEvent): Dropzone;
    public emit(eventName: 'dragover', e: DragEvent): Dropzone;
    public emit(eventName: 'dragleave', e: DragEvent): Dropzone;
    public emit(eventName: 'paste', e: DragEvent): Dropzone;

    public emit(eventName: 'reset'): Dropzone;

    public emit(eventName: 'addedfile', file: DropzoneFile): Dropzone;
    public emit(eventName: 'addedfiles', files: DropzoneFile[]): Dropzone;
    public emit(eventName: 'removedfile', file: DropzoneFile): Dropzone;
    public emit(eventName: 'thumbnail', file: DropzoneFile, dataUrl: string): Dropzone;

    public emit(eventName: 'error', file: DropzoneFile, message: string|Error): Dropzone;
    public emit(eventName: 'errormultiple', files: DropzoneFile[], message: string|Error): Dropzone;

    public emit(eventName: 'processing', file: DropzoneFile): Dropzone;
    public emit(eventName: 'processingmultiple', files: DropzoneFile[]): Dropzone;

    public emit(eventName: 'uploadprogress', file: DropzoneFile, progress: number, bytesSent: number): Dropzone;
    public emit(eventName: 'totaluploadprogress', totalProgress: number, totalBytes: number, totalBytesSent: number): Dropzone;

    emit(eventName: 'sending', file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData): Dropzone;
    public emit(eventName: 'sendingmultiple', files: DropzoneFile[], xhr: XMLHttpRequest, formData: FormData): Dropzone;

    public emit(eventName: 'success', file: DropzoneFile): Dropzone;
    public emit(eventName: 'successmultiple', files: DropzoneFile[]): Dropzone;

    public emit(eventName: 'canceled', file: DropzoneFile): Dropzone;
    public emit(eventName: 'canceledmultiple', file: DropzoneFile[]): Dropzone;

    public emit(eventName: 'complete', file: DropzoneFile): Dropzone;
    public emit(eventName: 'completemultiple', file: DropzoneFile[]): Dropzone;

    public emit(eventName: 'maxfilesexceeded', file: DropzoneFile): Dropzone;
    public emit(eventName: 'maxfilesreached', files: DropzoneFile[]): Dropzone;
    public emit(eventName: 'queuecomplete'): Dropzone;

    constructor(container: string|HTMLElement, options?: DropzoneOptions);
}

interface JQuery {
    dropzone(options: DropzoneOptions): Dropzone;
}

declare module 'dropzone' {
    export = Dropzone;
}
