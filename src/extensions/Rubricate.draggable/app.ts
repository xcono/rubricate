/// <reference path="dragula.d.ts"/>
import dragula = require("../../../node_modules/dragula/dist/dragula.js");
import AppForm from "../../core/AppForm";

function initDraggablePlugins() {

    // listen, when app wil be created to get app instance
    window.addEventListener('rubricate__app_created', (appCreatedEvent:CustomEvent) => {

        let app = appCreatedEvent.detail.app;

        // once we have app and its element, then listen form creation event
        app.el.addEventListener('rubricate__form_created', (formCreatedEvent:CustomEvent) => {

            let streamForm = formCreatedEvent.detail.form;
            // once form was created apply draggable plugins
            let drake = dragula([streamForm.el], {
                moves: isPluginFormElement
            });

            drake.on('drop', (el?: Element, container?: Element, source?: Element) => {
                setPluginFormsOrder(app.form);
            });

            setPluginFormsOrder(app.form);
        });

    });
}

function setPluginFormsOrder(form: AppForm) {

    let order = 0;

    for(let pluginForm of <any>form.el.childNodes) {

        if(isPluginFormElement(pluginForm)) {

            pluginForm.setAttribute('data-order', ++order);
        }
    }
}

function isPluginFormElement(el: HTMLElement|any) {
    return !!el.getAttribute('data-guid');
}

initDraggablePlugins();