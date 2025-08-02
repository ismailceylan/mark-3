# isEmpty
Checks if the given variable is empty.

If the variable is an object, it is considered empty if it has no keys.
If the variable is an array, it is considered empty if it has no elements.
If the variable is a map or a set, it is considered empty if it has no size.
If the variable is a string, it is considered empty if it is trimmed to be an empty string.
If the variable is undefined or null, it is considered empty.

Otherwise, it is not considered empty.

---

## Usage

```js
import { isEmpty } from 'mark-3/helpers/types/isEmpty';

isEmpty( '' ); // true
isEmpty( '     ' ); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty( new Map()); // true
isEmpty( new Set()); // true
isEmpty( null ); // true
isEmpty( undefined ); // true

isEmpty( 'foo' ); // false
isEmpty([ 'foo' ]); // false
isEmpty({ foo: 'bar' }); // false
isEmpty( new Map([ 'foo', 'bar' ])); // false
isEmpty( new Set([ 'foo' ])); // false
isEmpty({ foo: 'bar' }); // false
isEmpty(() => {}); // false
```
