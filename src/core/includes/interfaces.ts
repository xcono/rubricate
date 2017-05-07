
export interface PluginType {

    type: string;
    guid?: string;

    // internally added by stream or extensions
    _removed?: boolean;
    _el?: HTMLElement;

    constructor: PluginType;

    new(guid: string, defaults?:any, options?: any): PluginType;

    // human name of plugin
    getName(): string;
    // button icon source url
    getIcon?(): string;
    // plugin form html element
    getForm(): HTMLElement;
    // values of form
    getValues(): any;
    // uploads
    getUploads?(): Array<UploadedFile>;
}

export interface UploadedFile {
    path: string;
    filename: string;
    temp: number;
    guid?: string;
}

export interface AppFormValue {

    guid: string;
    type: string;
    values: any;
    attachments: Array<UploadedFile>
}

export interface PluginFormAction {
    name: string;
    order: number;
    el: HTMLElement;
}