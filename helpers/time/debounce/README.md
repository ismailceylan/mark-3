# debounce
A simple debounce utility function for JavaScript.

`debounce` delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked.

It is useful to limit the rate at which a function gets called, especially for events that trigger repeatedly like `resize`, `scroll`, or `input`.

---

## Usage
```js
import { debounce } from "mark-3/helpers/time";

const onResize = debounce(() =>
{
	console.log( "Window resized!" );
}, 200 );

window.addEventListener( "resize", onResize );
```
