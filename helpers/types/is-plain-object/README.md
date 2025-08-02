# isPlainObject
A utility function to check if a value is a plain object.

## Usage
```js
import { isPlainObject } from "mark-3/helpers/types";

isPlainObject({});                       // true
isPlainObject({ a: 1 });                 // true
isPlainObject(Object.create(null));      // true
isPlainObject([]);                       // false
isPlainObject(null);                     // false
isPlainObject(new Date());               // false
isPlainObject(function(){});             // false
isPlainObject(new Map());                // false
isPlainObject(new ( class MyClass{})()); // false
```
