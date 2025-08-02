# trim
A small utility function to trim specific characters from both ends of a string.

Unlike the native `String.prototype.trim()` which only removes whitespace, this function lets you specify exactly which characters to trim — including special characters or a list of them.

---

## Features
- Trim custom characters from the **start and end** of a string
- Accepts either a **single character string** or an **array of characters**
- Automatically escapes special regex characters
- Ignores non-string input safely

---

## Usage
```js
import { trim } from "mark-3/helpers/string";

// Default whitespace trim
trim("   Hello world   "); 
// => "Hello world"

// Trim specific character
trim("---Hello---", "-"); 
// => "Hello"

// Trim multiple characters
trim("..//Hello//..", [".", "/"]); 
// => "Hello"

// No trim if input is not a string
trim(42, "-"); 
// => 42

// Empty trim characters (returns input as-is)
trim("text", ""); 
// => "text"

// trim characters as a pattern
trim(":::text:::_", ":::" ); 
// => "text:::_"
```

---

## Parameters
```ts
trim(input: string, chars?: string | string[]): string
```

| Name  | Type                 | Default | Description                             |
| ----- | -------------------- | ------- | --------------------------------------- |
| input | `string`             | —       | The string to be trimmed                |
| chars | `string \| string[]` | `" "`   | The character(s) to trim from both ends |

If chars is a string of multiple characters, each character will be treated individually and removed if present at the start or end.

**Behavior Details**
If chars is an array: All characters in the array will be treated as individual characters to trim.

If chars is a string:
* A single-character string: trimmed directly like a single items array.
* A multi-character string: each character as a whole.

All special characters like ., *, +, ^ are automatically escaped — no need to handle them manually.