# isNumeric
A simple utility function to check if a value is numeric or can be converted to a valid finite number.

---

## Usage
```js
import { isNumeric } from "mark-3/helpers/types";

isNumeric(123);      // true
isNumeric('1e4');    // true
isNumeric('123abc'); // false
isNumeric('');       // false
isNumeric(Infinity); // false
isNumeric(null);     // false
```
