Usage
-----

Add stream.js to html template.
Create new instance of Stream:

```$js
var stream = Stream.create();
stream.init();
```

Define your own plugin
----------------------

Create object implements Plugin interface:

```$ts
interface Plugin {

    type: string;
    guid?: string;

    getName(): string;
    getForm(values: any): HTMLElement[];
    getValues(form: HTMLElement): any;
}
```

Add the plugin to Stream:

```$js
var stream = Stream.create();
stream.types.add(myPlugin);
```

Full example:

```$js
var myPlugin = {
        
        _input: {},

        type: 'my_plugin',

        getName: function() {
            return 'My Plugin Name'
        },

        getForm: function() {
            this._input = document.createElement('input');
            this._input.type = 'text';
            return this._input;
        },

        getValues: function(formEl) {
            return {
                input: this._input.value
            };
        }
    };

var stream = Stream.create();
stream.types.append(myPlugin);
```