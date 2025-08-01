# format
A lightweight and flexible date formatting utility for JavaScript and TypeScript. This helper formats Date objects using PHP-style tokens like Y, m, d, H, i, and more. It supports both short and long month names with locale-aware formatting via Intl.DateTimeFormat.

Built with simplicity and clarity in mind — no external dependencies, easy to use, fully typed.

---

## Usage
```ts
import { format } from '@mark-3/helpers/date';

format( new Date, "Y-m-d H:i:s" );
// 2022-01-01 22:00:00 (mysql datetime format)

format( new Date, "j MM, H:i", "tr" );
// 1 Temmuz, 22:00
```

---

## 💡 Supported Tokens
`d`: 01-31 (zero-padded day)
`j`:  1-31 (non-padded day)
`m`: 01-12 (zero-padded month)
`n`:  1-12 (non-padded month)
`M`: Jan–Dec (short month name, localized)
`MM`: January–December (long month name, localized)
`y`: 00-99 (two-digit year)
`Y`: 0000-9999 (full year)
`H`: 00-23 (zero-padded hour, 24h)
`G`:  0-23 (hour, 24h)
`i`: 00-59 (minutes)
`s`: 00-59 (seconds)
