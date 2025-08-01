# fromTimestamp
This function handles both seconds and milliseconds timestamps by checking the length of the number.

If the `timestamp` is less than `1e11`, it's assumed to be in seconds and is converted to milliseconds. If the conversion results in an invalid `Date` object, the function returns the provided `defaultValue`
or `undefined` if no default is specified.

---

## Usage
```ts
import fromTimestamp from '@mark-3/helpers-date-from-timestamp';

const result = fromTimestamp( 1753634780845 );
```
