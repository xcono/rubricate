import {PluginType} from './interfaces';
import PluginTypeCollection from '../PluginTypeCollection';
import {plugin_form_insert, plugin_form_removed} from './events';

const STREAM_FORM_BLOCK_CSS_CLASS = 'fs-form';

export function streamPluginFormElement(plugin: PluginType, defaults: any) {

    let wrapper = document.createElement('div');
    wrapper.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '__plugin');
    wrapper.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin');

    wrapper.id = plugin.guid;
    wrapper.setAttribute('data-guid', plugin.guid);
    wrapper.setAttribute('data-order', defaults.order ? defaults.order.toString() : Number.MAX_SAFE_INTEGER);

    let form = document.createElement('div');
    form.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__form');
    form.appendChild(plugin.getForm());

    wrapper.appendChild(streamPluginHeaderElement(plugin));
    wrapper.appendChild(form);

    return wrapper;
}

/**
 * Generate App form HTMLElement, includes menu.
 * @param types
 * @returns {HTMLDivElement}
 */
export function streamFormElement(types: PluginTypeCollection): HTMLElement {

    let form = document.createElement('div');
    form.classList.add(STREAM_FORM_BLOCK_CSS_CLASS);

    let menu = streamFormMenuElement(form, types);
    form.appendChild(menu);

    return form;
}

/**
 * Generates menu HTMLElement for App form, includes menu items based on plugin types.
 * @param form HTMLElement
 * @param types PluginTypeCollection
 * @returns {HTMLUListElement}
 */
function streamFormMenuElement(form: HTMLElement, types: PluginTypeCollection): HTMLElement {

    let menu = document.createElement('ul');
    menu.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '__menu');
    menu.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-menu');

    for(let pluginType of types) {
        menu.appendChild(streamFormMenuItemElement(form, pluginType));
    }

    return menu;
}

/**
 * Generates single menu item based on plugin type for App form.
 * @param pluginType
 * @returns {HTMLLIElement}
 */
function streamFormMenuItemElement(form: HTMLElement, pluginType: PluginType): HTMLElement {

    let item = document.createElement('li');
    item.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-menu__item');

    if(pluginType.hasOwnProperty('getIcon') && typeof pluginType.getIcon === 'function') {
        let icon = document.createElement('img');
        icon.src = pluginType.getIcon();
        icon.title = pluginType.getName();
        icon.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-menu__item-icon');
        item.appendChild(icon);
    }
    else {
        item.innerText = pluginType.getName();
    }

    item.addEventListener('click', () => {
        form.dispatchEvent(plugin_form_insert(pluginType));
    });

    return item;
}

function streamPluginHeaderElement(plugin: PluginType): HTMLElement {

    let header = document.createElement('div');
    header.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__header');

    let pluginName = document.createElement('div');
    pluginName.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__name');
    pluginName.innerText = plugin.constructor.getName();
    header.appendChild(pluginName);

    let drag = document.createElement('div');
    drag.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__drag');
    drag.innerText = '✣'; // &#x2723;
    header.appendChild(drag);

    let actions = document.createElement('div');
    actions.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__actions');
    header.appendChild(actions);

    let actionDelete = document.createElement('div');
    actionDelete.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__action');
    actionDelete.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-plugin__action--delete');
    actionDelete.innerText = '×'; // &times;
    actions.appendChild(actionDelete);

    actionDelete.addEventListener('click', () => {
        let form = document.getElementsByClassName(STREAM_FORM_BLOCK_CSS_CLASS)[0];
        form.dispatchEvent(plugin_form_removed(plugin));
    });

    return header;
}

export function streamMessageElement(appElement: HTMLElement) {

    let el = document.createElement('div');
    el.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '__message');
    el.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-message');
    el.setAttribute('data-css-class', STREAM_FORM_BLOCK_CSS_CLASS + '-message');

    appElement.appendChild(el);

    return el;
}

export function streamMessageLineElement(text: string, type: string) {

    let el = document.createElement('div');
    el.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-message__line');
    el.classList.add(STREAM_FORM_BLOCK_CSS_CLASS + '-message__line--' + type);
    el.innerHTML = text;

    return el;
}