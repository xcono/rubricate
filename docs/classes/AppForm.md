AppForm class
=============

The class for manage Rubricate application form. You can access to instance of the class via Rubricate instance via `app.form` property.

Properties
----------
| property      | instance of          | description   |
| ------------- | -------------------- | ------------- |
| `el`          | HTMLElement          | The form HTML DOM element. |
| `appEl`       | HTMLElement          | HTML DOM element used to create the Rubricate app. |
| `types`       | PluginTypeCollection | A list of constructors of available plugin types. |
| `plugins`     | PluginCollection     | A list of plugins added to the form. |
| `options`     | object               | Options object added on initialization of rubricate app. |
| `messenger`   | Messenger            | Messenger attached to the form. |

Methods
-------
`render()` — method shows form in browser. Called in `Rubricate` constructor.
1. creates element of the form and insert it into the rubricate element;
2. creates plugin forms based on data in `options.defaultData`;
3. dispatches `rubricate__form_created` event;

`insertPluginForm(pluginType) : void` — creates an instance of plugin based on given PluginType class, push it to `this.plugins` collection, then creates and inserts plugin form into the app form. At the end dispatches `rubricate__plugin_form_inserted` event.
 
`removePluginForm(plugin) : void` — removes given plugin from `this.plugins` collection and destroys plugin form.

`getPluginFormValues() : array` — kind a "pre-serialization" method, return array of values collected from plugins in `this.plugins`. The method also tries to call `.getAttachemtns()` method on every plugin instance and put returned value to `attachment` property. Example of returning value structure:
```js
return [{
    guid: plugin.guid,
    type: plugin.constructor.type,
    values: plugin.getValues(),
    attachments: plugin.getAttachments()
}]
```

`generateGuid(): string` — simple method to generate "guids" for plugins. The code was stolen somewhere.