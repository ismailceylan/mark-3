# isSet
Utility function to check if a value is a native `Set` object in JavaScript.

---

## Usage
```js
import { isSet } from "mark-3/helpers/types";

isSet(new Set());     // true
isSet(new WeakSet()); // false
isSet({});            // false
isSet([]);            // false
isSet(null);          // false
```
