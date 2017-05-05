App class
============

The main class for manage stream application.

Properties
----------
`el` — HTMLElement object used to create the stream.  
`form` — StreamForm object.
`messenger` — Messenger object.
`types` — PluginCollection object.  

Methods
-------
`getData` — collect resulting values from rubricate app and plugins as json object.

Note! It is the only way to get data from rubricate app, so you have to implement your own algorithm to save and update this data.

In the most cases, it's better to handle changes someway and push json data to server endpoint.
Dummy example where we save data to text field on submit form:


```html
<form id="my-form">
    <div id="my-app"></div>
    <input type="hidden" id="#my-form__app-json">
    <input type="submit" value="Submit">
</form>
```

```$js
// init app
let appHtmlElement = document.getElementById('my-app');
let app = Rubricate(appHtmlElement);

// add form onsubmit event listener
let form = document.getElementById('my-form');
let jsonStringField = document.getElementById('#my-form__app-json');

form.addEventHandler('submit', () => {
    jsonStringField.value = JSON.stringify(app.getData());
});
```