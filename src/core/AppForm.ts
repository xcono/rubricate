import {PluginType, AppFormValue, UploadedFile} from './includes/interfaces'
import {streamFormElement, streamPluginFormElement} from './includes/render'
import PluginCollection from './PluginCollection';
import {
    PLUGIN_FORM_REMOVED,
    PLUGIN_FORM_INSERT,
    app_form_created,
    plugin_form_inserted
} from './includes/events';

import AppMessenger from './AppMessenger';

/**
 * Manage form for App.
 */
export default class AppForm {


    el: HTMLElement;
    appElement: HTMLElement;

    types: any;
    plugins: any;

    options: any;
    messenger: AppMessenger;

    constructor(appElement: HTMLElement, options: any, types: any, messenger: AppMessenger) {

        this.options = options;
        this.types = types;
        this.plugins = new PluginCollection();
        this.messenger = messenger;
        this.appElement = appElement;
    }

    render() {

        this.el = streamFormElement(this.types);
        this.appElement.appendChild(this.el);

        this.processDefaultDataPlugins();
        this.initPluginRemoveEventListener();

        this.appElement.dispatchEvent(app_form_created(this));

        this.el.addEventListener(PLUGIN_FORM_INSERT, (e: CustomEvent) => {
            this.insertPluginForm(e.detail.pluginType)
        });
    }

    /**
     * Creates plugins forms from given default data.
     */
    private processDefaultDataPlugins() {

        if(this.options.defaultData.hasOwnProperty('plugins')) {

            for(let plugin of this.options.defaultData.plugins) {
                let pluginType = this.types.get(plugin.type);

                if(pluginType) {
                    this.insertPluginForm(pluginType, plugin);
                }
            }
        }
    }

    /**
     * Insert plugin form based on given pluginType class.
     * @param pluginType
     * @param defaults
     */
    insertPluginForm(pluginType:PluginType, defaults: any = {}) {

        let plugin = new pluginType(defaults, this.options);
        plugin.guid = defaults.guid ? defaults.guid : this.generateGuid();

        this.plugins.add(plugin);

        let pluginForm = streamPluginFormElement(this.appElement, plugin, defaults);
        plugin._el = pluginForm;
        this.el.appendChild(pluginForm);

        this.el.dispatchEvent(plugin_form_inserted(plugin));
    }

    /**
     * Remvoe plugin from App form;
     * @param plugin PluginType
     */
    removePluginForm(plugin: PluginType) {

        plugin._removed = true;

        let pluginForm = document.getElementById(plugin.guid);
        pluginForm.parentNode.removeChild(pluginForm);

        this.messenger.info('Plugin ' + plugin.constructor.getName() + ' deleted.');
    }

    /**
     * Collect all values of plugins;
     * @returns {AppFormValue|any}
     */
    getPluginFormValues(): any {

        let plugins = <AppFormValue|any>[];
        let uploads_remove = <UploadedFile|any>[];

        for(let value of this.plugins.serialize()) {

            if(value.removed) {
                uploads_remove = uploads_remove.concat(value.uploads);
            }
            else {
                for(let uploads of value.uploads) {

                    if(uploads.removed) {
                        uploads_remove = uploads_remove.concat(uploads);
                        value.uploads.splice(value.uploads.indexOf(uploads), 1);
                    }
                }

                plugins.push(value);
            }
        }

        return {plugins, uploads_remove};
    }

    /**
     * Generate GUID for plugin.
     * @returns {string}
     */
    generateGuid(): string {
        let S4 = () => ( ( (1 + Math.random() ) * 0x10000 ) | 0).toString(16).substring(1); // tslint:disable-line
        return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    }

    private initPluginRemoveEventListener() {

        this.el.addEventListener(PLUGIN_FORM_REMOVED, (e:CustomEvent) => {
            this.removePluginForm(e.detail);
        });
    }
}