# escapeRegex
Escapes special characters in a string to be used in a regular expression.

---

## Usage
```js
import { escapeRegex } from "mark-3/helpers/string";

escapeRegex( "foo" );  // => "foo"
escapeRegex( "foo*" ); // => "foo\*"
```
