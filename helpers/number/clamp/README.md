# clamp
Clamps a value between min and max. If min is greater than max, min and max will be swapped.

---

## Usage
```js
import { clamp } from "mark-3/helpers/number";

clamp(-1, 0, 10 ); // => 0
clamp(2000, 1, 5 ); // => 5
```
