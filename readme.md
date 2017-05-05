Rubricate it's javascript library inspired by Stream (Wagtail), Paragraphs (Drupal), inlines (Django).


Usage
=====

Contents:
- [Events](docs/events.md)
- [Plugins](docs/plugins.md)

Classes:
- [App](docs/classes/App.md)
- [AppForm](docs/classes/StreamForm.md)
- [PluginCollection](docs/classes/PluginCollection.md)
- [PluginTypeCollection](docs/classes/PluginTypeCollection.md)
- [Messenger](docs/classes/Messenger.md)

Extensions
- [rubricate.draggable](docs/extensions/rubricate.draggable.md)
- [rubricate.plugins](docs/extensions/rubricate.plugins.md)

Installation
------------

Add `rubricate.js` to html template.
Create new instance of `rubricate`:

```$js
let appHtmlElement = document.getElementById('#element-id');
let app = Rubricate(appHtmlElement);
```

Options
-------

You also can pass options object passed to every plugin constructor.

`defaultData` — json object used to display data and plugins by default. Must have a structure similar to the `stream.getData()` method returns.
```$js
let appHtmlElement = document.getElementById('#element-id');
let stream = Rubricate(appHtmlElement, {
    defaultData: {plugins:[]}
});
```

Example
-------
Dummy example where we save data to text field on submit form:


```html
<form id="my-form">
    <div id="my-app"></div>
    <input type="hidden" id="#my-form__app-json">
    <input type="submit" value="Submit">
</form>
<script src="rubricate.js"></script>
```

```$js
// init application
let appHtmlElement = document.getElementById('my-app');
let app = Rubricate(streamHtmlElement);

// add form onsubmit event listener
let form = document.getElementById('my-form');
let jsonStringField = document.getElementById('#my-form__app-json');

form.addEventHandler('submit', () => {
    jsonStringField.value = JSON.stringify(app.getData());
});
```