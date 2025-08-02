# camelToDash
Converts a camelCase string to dash-case.

* replaces uppercase letters with a dash followed by the lowercase equivalent
* removes leading and trailing dashes
* if the input is not a string, returns it unchanged

---

## Usage
```js
import { camelToDash } from "mark-3/helpers/string";

camelToDash("helloWorld");       // "hello-world"
camelToDash("backgroundColor");  // "background-color"
camelToDash("already-dashed");   // "already-dashed"
camelToDash("already---dashed"); // "already---dashed"
camelToDash("MyComponent");      // "my-component"
camelToDash("XMLHttpRequest");   // "x-m-l-http-request"
camelToDash("someValue123");     // "some-value123"
camelToDash("---EdgeCase---");   // "edge-case"
camelToDash(42);                 // 42
camelToDash(null);               // null
```
