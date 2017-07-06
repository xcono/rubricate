/// <reference path="../dropzone.d.ts" />

export default class FilesPlugin {

    static type: string = 'files_plugin';
    public guid: string;

    private _dropzone: Dropzone;
    private _uploads: Array<{path: string, name: string, removed?: boolean}> = [];

    private _options: any;
    private _defaults: any;

    constructor(defaults: any, options: any) {
        this._options = options;
        this._defaults = defaults;
    }

    static getName() : string {
        return 'Files Plugin';
    }

    static getIcon() : string {
        // using icon from CDN https://cdnjs.com/libraries/foundicons
        // icon kit: http://zurb.com/playground/foundation-icon-fonts-3
        return 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-photo.svg';
    }

    getForm() : HTMLElement {

        // dropzone
        let dz = document.createElement('div');
        dz.classList.add('fs-dropzone');
        this.initDropzoneToElement(dz, this._options.uploadUrl(), this._options.csrfToken());

        // defaults
        this.existingAttachments();

        // wrapper
        let wrapper = document.createElement('div');
        wrapper.appendChild(dz);

        return wrapper;
    }

    getValues(form: HTMLElement) : any {
        return {};
    }

    getUploads() {
        return this._uploads;
    }

    initDropzoneToElement(el: HTMLElement, uploadUrl: any, csrf: string) {

        // add dropzone css class to apply dropzonejs default styles
        el.classList.add('dropzone');

        // headers
        let headers = csrf ? {'X-CSRFToken': csrf, 'X-App-Plugin': FilesPlugin.type} : {'X-App-Plugin': FilesPlugin.type};

        // init dropzone
        this._dropzone = new Dropzone(el, { url: uploadUrl, headers, addRemoveLinks: true});
        Dropzone.options.dropzone = false;

        // dropzone event
        this._dropzone.on('success', (file:any, xhr:any) => {
            xhr.temp = 1;
            this._uploads.push(xhr);
        });

        this._dropzone.on('removedfile', (file:any) => {
            for(let attachment of this._uploads) {
                if(file.name === attachment.name) {
                    attachment.removed = true;
                }
            }
        });
    }


    existingAttachments() {


        if(this._defaults && this._defaults.hasOwnProperty('uploads')) {

            for(let file of this._defaults.uploads) {

                this._dropzone.options.addedfile.call(this._dropzone, file);
                this._dropzone.options.thumbnail.call(this._dropzone, file, file.url);
                this._dropzone.options.complete.call(this._dropzone, file);
                this._uploads.push(file);
            }
        }
    }
}