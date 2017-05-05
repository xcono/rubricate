import AppForm from './AppForm';
import {app_created} from './includes/events';
import PluginTypeCollection from './PluginTypeCollection';
import AppMessenger from "./AppMessenger";


export default class App {

    el: HTMLElement;
    form: AppForm;
    types: PluginTypeCollection;
    messenger: AppMessenger;

    constructor(el: HTMLElement, options: any) {

        this.el = el;
        this.types = new PluginTypeCollection();

        this.messenger = new AppMessenger(this.el);
        this.form = new AppForm(this.el, options, this.types, this.messenger);

        // the event used for aggregate defined plugins
        window.dispatchEvent(app_created(this));

        this.form.render();
    }

    getData() {

        return this.form.getPluginFormValues();
    }
}