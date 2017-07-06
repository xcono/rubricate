// import '@types/medium-editor'
/// <reference path="../medium.d.ts" />
import * as MediumEditor from 'medium-editor'


export default class RichTextPlugin {

    static type: string = 'rich_text_plugin';
    public guid: string;

    private _options: any;
    private _defaults: any;

    private _text: any;

    constructor(defaults: any, options: any) {

        this._options = options;
        this._defaults = defaults;

        this._text = null;
    }

    static getName() : string {
        return 'Rich Text Plugin';
    }

    static getIcon() : string {
        // using icon from CDN https://cdnjs.com/libraries/foundicons
        // icon kit: http://zurb.com/playground/foundation-icon-fonts-3
        return 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-text-color.svg';
    }

    getForm() : HTMLElement {

        let values = this._defaults.values;


        this._text = document.createElement('div');

        if(values.input.length) {
            this._text.innerHTML = values.input;
        }


        // this._text.value = values ? values.input : '';

        let editor = new MediumEditor([this._text]);

        return this._text;
    }

    getValues() : any {
        return {
            input: this._text.innerHTML
        };
    }
}
