Stream.draggable extension
==========================

The extension allow to drag and drop plugin forms. Order saved to every plugin value returned by `stream.getData`.

Drag and drop ability provided by [dragula](https://github.com/bevacqua/dragula) library.

Installation
------------
1. Add `dragula.js` and `dragula.css` from [dragula](https://github.com/bevacqua/dragula) library.
2. Add `stream.draggable.js` before calling `Stream.create()`.
```html
<html>
...
<div id="my-stream"></div>

<link href="dragula.css" />
<script src="dragula.js"></script>

<script src="Stream.js"></script>
<script src="Stream.draggable.js"></script>
</html>
```

```js
var stream = Stream.create(document.getElementById('#element-id'));
```

How to replace dragula
----------------------

Dragula is a beautiful library, but if you want to replace it, then don't forget to set `data-order` property for every plugin form after user makes changes in order of the forms.