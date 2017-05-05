Events
======

`rubricate__app_created` — attached to window object. The event fired after initialization of app instance, but before form rendered.  

Commonly used to adding plugins from 3-rd party code, for example `rubricate.plugins.js` uses this event to add plugin types available for th stream:

```js
 // add new plugin type from your code
 window.addEventListener('rubricate__app_created', (event) => {
     // event.detail : {app: App}
     event.detail.app.types.add(MyCustomPluginClass);
 });
```
***
`rubricate__form_created` — attached to the app HTML element. The event fired after the rubricate form was created and rendered.

Commonly used to manipulate form after creation, for example `rubricate.draggable.js` extension listen this event to add drag-and-drop ability for plugins forms inside the stream form.

```js
window.addEventListener('rubricate__app_created', (appCreatedEvent) => {

        let app = appCreatedEvent.detail.app;

        app.el.addEventListener('rubricate__form_created', (appFormCreatedEvent) => {
            
            // appFormCreatedEvent.detail : {form: AppForm}
            // make plugin forms draggable
        });
    });
```
***
`rubricate__plugin_form_insert` — attached to the app form HTML element (`app.form.el`). The event fired after user requested (click) to add a new plugin form via menu UI.

The `event.detail.pluginType` property contains `PluginType` class, which might be used to create new plugin.
```js
stream.form.el.addEventListener('rubricate__plugin_form_insert', (e) => {
    // e.detail : {pluginType: pluginType}
    // insert plugin form into the stream form
});
```
***
`rubricate__plugin_form_inserted` — attached to the app form HTML element (`app.form.el`). The event fired after a plugin form was inserted into the app form.
 
Note! The event fired on every plugin insert, even if it is a plugin from `defaultData` option added on the app instance creation.

The `event.detail.pluginType` property contains `PluginType` instance.
```js
app.form.el.addEventListener('rubricate__plugin_form_inserted', (e) => {
    // e.detail : {plugin: pluginType}
    // do something after plugin form was inserted
});
```