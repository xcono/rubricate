export default class HeaderPlugin {

    static type: string = 'header_plugin';
    public guid: string;

    private _options: any;
    private _defaults: any;

    private _text: any;
    private _level: HTMLSelectElement;

    constructor(defaults: any, options: any) {

        this._options = options;
        this._defaults = defaults;

        this._text = null;
    }

    static getName() : string {
        return 'Header Plugin';
    }

    static getIcon() : string {
        // using icon from CDN https://cdnjs.com/libraries/foundicons
        // icon kit: http://zurb.com/playground/foundation-icon-fonts-3
        return 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/svgs/fi-bold.svg';
    }

    getForm() : HTMLElement {

        let values = this._defaults.values;

        this._text = document.createElement('input');
        this._text.type = 'text';
        this._text.value = values ? values.input : '';

        this._level = document.createElement('select');

        for (let i = 1; i < 7; i++) {
            let option:HTMLOptionElement = document.createElement('option');
            option.value = i.toString();
            option.text = i.toString();
            option.selected = values && values.level == i;
            this._level.appendChild(option);
        }

        let form = document.createElement('div');
        form.appendChild(this._level);
        form.appendChild(this._text);

        return form;
    }

    getValues() : any {
        return {
            input: this._text.value,
            level: this._level.value
        };
    }
}
