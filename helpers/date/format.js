/**
 * Format a date according to a given pattern.
 *
 * @param {Date} date The date to format.
 * @param {string} pattern The pattern to use for formatting the date.
 * @param {string} [lang="en"] The language to use for month names.
 * @returns {string} The formatted date string.
 *
 * Supported patterns:
 *
 * - d: 01-31 (zero-padded day of the month)
 * - j:  1-31 (day of the month)
 * - m: 01-12 (zero-padded month)
 * - n:  1-12 (month)
 * - M: January-December (month name, localized for the given language)
 * - y: 00-99 (2-digit year)
 * - Y: 0000-9999 (4-digit year)
 * - H: 00-23 (zero-padded hour in 24-hour format)
 * - G:  0-23 (hour in 24-hour format)
 * - i: 00-59 (zero-padded minute)
 * - s: 00-59 (zero-padded second)
 */
export default function formatDate( date, pattern, lang = "en" )
{
	function pad( n, len = 2 )
	{
		return n.toString().padStart( len, "0" );
	}

	const replacements =
	{
		// Day
		d: pad( date.getDate()),	   // 01-31
		j: date.getDate().toString(),  //  1-31

		// Month
		m: pad( date.getMonth() + 1 ),         // 01-12
		n: ( date.getMonth() + 1 ).toString(), //  1-12
		M:  new Intl.DateTimeFormat( lang, { month: "short" }).format( date ),
		MM: new Intl.DateTimeFormat( lang, { month: "long"  }).format( date ),

		// Year
		y: date.getFullYear().toString().slice( -2 ), // 2 digit year
		Y: date.getFullYear().toString(),             // 4 digit year

		// Hour
		H: pad( date.getHours()),	   // 00-23
		G: date.getHours().toString(), //  0-23

		// Minute
		i: pad( date.getMinutes()),	 // 00-59

		// Second
		s: pad( date.getSeconds()),	// 00-59
	}

	return pattern.replace( /d|j|m|n|MM|M|y|Y|H|G|i|s/g, match =>
		replacements[ match ]
	);
}
