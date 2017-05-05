Rubricate.draggable extension
==========================

The extension allow to drag and drop plugin forms. Order saved to every plugin value returned by `app.getData`.

Drag and drop ability provided by [dragula](https://github.com/bevacqua/dragula) library.

Installation
------------
Add `rubricate.draggable.js` before calling `Rubricate()`.
```html
<html>
...
<div id="my-app"></div>

<script src="rubricate.js"></script>
<script src="rubricate.draggable.js"></script>
</html>
```

```js
var app = Rubricate(document.getElementById('#my-app'));
```

How to replace dragula
----------------------

Dragula is a beautiful library, but if you want to replace it, then don't forget to update attribute `data-order` property for every plugin form after user makes changes in order of the forms.