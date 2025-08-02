# isMap
Utility function to check if a value is a native `Map` object in JavaScript.

---

## Usage
```js
import { isMap } from "@mark-3/helpers/types";

isMap(new Map());     // true
isMap(new WeakMap()); // false
isMap({});            // false
isMap([]);            // false
isMap(null);          // false
```
