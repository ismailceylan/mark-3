# random
Returns a random number between 0 and 1. If no value is provided, a random number is produced.

---

## Usage
```js
import { random } from "mark-3/helpers/number";

// between 0 and 1
random(); // 0.123456789

// between min and max
random( 5, 10 ); // 6.789
random( 0.01, 0.02 ); // 0.0194569
```
