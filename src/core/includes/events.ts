import App from '../App';
import {PluginType, PluginFormAction} from './interfaces';
import AppForm from '../AppForm';

export const APP_CREATED = 'rubricate__app_created';
export const APP_FORM_CREATED = 'rubricate__form_created';

export const PLUGIN_FORM_INSERT = 'rubricate__plugin_form_insert';
export const PLUGIN_FORM_INSERTED = 'rubricate__plugin_form_inserted';
export const PLUGIN_FORM_REMOVED = 'rubricate__remove_plugin';

export const PLUGIN_FORM_ACTIONS_BUILDING = 'rubricate__plugin_form_actions_building';


export function app_created(app: App) : CustomEvent {
    return new CustomEvent(APP_CREATED, {detail: {app}});
}
export function app_form_created(form: AppForm) : CustomEvent {
    return new CustomEvent(APP_FORM_CREATED, {detail: {form}});
}

export function plugin_form_insert(pluginType: PluginType) : CustomEvent {
    return new CustomEvent(PLUGIN_FORM_INSERT, {detail: {pluginType}});
}
export function plugin_form_inserted(plugin: PluginType) : CustomEvent {
    return new CustomEvent(PLUGIN_FORM_INSERTED, {detail: {plugin}});
}
export function plugin_form_removed(plugin: PluginType) : CustomEvent {
    return new CustomEvent(PLUGIN_FORM_REMOVED, {
        'detail': plugin
    });
}
export function plugin_form_actions_building(buttons: Array<PluginFormAction>) : CustomEvent {
    return new CustomEvent(PLUGIN_FORM_ACTIONS_BUILDING, {detail: {buttons}});
}