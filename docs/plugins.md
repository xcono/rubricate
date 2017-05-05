Plugins
=======
The rubricate app is all about plugins. It's important don't be confused comparing plugin instances and plugin classes. So, in this document, `plugin` means plugin instance and `PluginType` is plugins class. 

Plugin structure
----------------

Stream app was written in TypeScript language, so you can check `interfaces.ts` file to explore `PluginType` interface.

### Constructor ###

Constructor of PluginType assume two arguments:

|argument                | description |
|------------------------|--------------|
| `defaults: any`        | default data for this plugin instance            | 
| `defaults.uploads`     | uploaded attachments of the plugin               |
| `options: any`         | options passed to `Rubricate(el, options)`   |

So, you can use any data you passed on the app creation and define your own options.

### Properties ###

|property          | instance of | description |
|------------------|-------------|-------------|
| *`static`*`type` | `string`    | Must contain "machine name" of the PluginType.  Examples: `header_plugin`, `files_plugin`, etc.       | 
| *`public`*`guid` | `string`    | Contains GUID of plugin instance. The `guid` generates automatically on plugin inserting by `AppForm.guid()` method. |

### Methods ###

|method          | description   |
|---------------------|----------|
| *`static`*`getName():string`   | Must return "human name" of the plugin. Used for plugin form label.     | 
| *`static`*`getIcon?():string`  | Optional. Might return url to icon used for plugin menu. |
| `getForm(): HTMLElement`       | Must return HTMLElement with form of the plugin.        | 
| `getValues():any`              | Might return plugin object with plugin values. This object passed to `default` argument of `PluginType` constructor. |
| `getUploads?(): Array`         | Optional. Might return array of object implement `UploadPayload`.      | 


How to create you own plugin type
---------------------------------

You have to create class with minimum:
- `type` static property
- `getName()` static method returned "human"
- `getForm()` public method
- `getValues()` public method

Then you might listen `rubricate__app_created` event and put your class to `app.types` collection.

Examples
--------

You can check real examples in source code of `rubricate.plugins.js` extension.

### Minimum plugin ###

Example with good old vanilla JS.

```js
// required: create constructor
function TextPlugin(defaults, options) {
    // optional: put default values to internal class property to get easy access to them from methods
    this._defaults = defaults;
}

// required: static property with "machine name"
TextPlugin.type = 'text_plugin';

// required: create public method with "Human Name"
TextPlugin.getName = function(){return 'Text Plugin'};

// optional: create property to store our form element
TextPlugin.prototype._input = null;

// required: create public method ti get form HTMLElement
TextPlugin.prototype.getForm = function(){
    
    // create only form input
    this._input = document.createElement('input');
    // use this._defaults we store in constructor to fill default value
    this._input.value = this._defaults.values || '';
    // return HTMLElement
    return this._input;
};

// required: create public method return out plugin value (just a string in this case)
TextPlugin.prototype.getValues = function(){
    return this._input.value;
};

// Since class is ready, then listen stream creation and put class to 'app.types' collection
window.addEventListener('rubricate__app_created', (e) => {
    e.detail.app.types.add(TextPlugin);
});
```

PluginType is ready!

### File Uploads ###

I recommend to use or extend file related plugins from `rubricate.plugins.js` classes. But if you're going to implement your own plugin with file upload, then this part for you.

Remember that you can pass values to stream with `getValues` and get in constructor in your plugin. So, you can implement any approach to manage uploads. I will appreciate, if you share you own approach to upload files with plugins.


First, take a look at `getUploads?(): Array<UploadedFile>` plugin method used by stream to get file attachments, process removed files and put it to `uploads` property of plugin data. All plugin data marked to remove attachments (has property `removed` equals `true`) collected to special `uploads_remove` array and attached to data returned by `app.getData`. So, we can send to server attachment paths, which has to be removed.

If you return any attachments you can get it after plugin will created again in constructor of your `PluginType` via argument `defaults.uploads`

For example, the `files_plugin` as a part of `rubricate.plugins.js` extension uses such approach as:

1. FilesPlugin required to pass `uploadUrl` to `options` on the app creation. 
```js
var options = {uploadUrl: 'rest/api/file/put'};
var app = Rubricate(document.getElementById('#app-element'), options);
```
2. FilesPlugin `getForm()` returns Dropzone element. Dropzone configured with `options.uploadUrl` passed to the plugin constructor. This url might receive file, move it to tmp server folder and returns path to this file.
```js

class FilesPlugin {
    
    _options;
    _defaults;
    // defining properties ...
    
    constructor(defaults, options) {
        this._options = options;
        this._defaults = defaults;
        // do something ...
    }
    
    getForm() {
        
        // we use url where we will upload files
        let d = new Dropzone(el, { url: uploadUrl});

        // we also put default files loaded before to Dropzone
        this._uploads = this._defaults.uploads;
        Dropzone.putDefaultFilesToDropzoneArea(this._uploads);
        
        // if requested file remove, mark it as removed
        Dropzone.onFileRemove((file) => {
            file.removed = true;
        });
            
       
        
        // push uploaded files to attachment
        let file = Dropzone.getFileOnSuccess();
        file.temp = true;
        this._uploads.push(file);
    }
    
    getUploads() {
        return this._uploads;
    }
}
```
3. `getUploads()` must return array of objects implements interface `UploadedFile`, The interface must provide properties below:
- `path` — server path to uploaded file. We receive response after file upload with path to file from backend.
- `filename` — filename of uploaded file

But FilesPlugin also return `temp` and `remove` properties, to compare temporary, permanent uploaded or removed attachments on backend.

The backend implementation is pretty simple:
 1. Parse Rubricate json uploads with `temp = true`
 2. Move attachment from tmp `path` to public folder
 3. Replace `path` property to new file destination.

And removing files on backend:
 1. Parse Rubricate json attachments with `remove = true`
 2. Remove file.
 3. Remove plugin json from plugins array or list.
