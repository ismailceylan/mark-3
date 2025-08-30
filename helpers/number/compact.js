import { reduce } from ".";

/**
 * Formats the given number according to the locale and display style.
 *
 * @param {number} num The number to be formatted.
 * @param {"short"|"long"} [display="short"] The style of the number. Can be "short" or "long"
 * @param {string} [locale="en-US"] The locale that should be used for formatting.
 * @return {string} The formatted number.
 */
export default function compact( num, display = "short", locale = "en-US" )
{
	if( num === null || num === undefined )
	{
		return "-";
	}

	if( typeof num !== "number" )
	{
		num = Number( num );
	}

	// { IntegerPartLength: MaximumFractionDigits }
	const fractionPolicy =
	{
		1: 2,
		2: 1,
		3: 0
	}

	const numberPart = Math.round( reduce( num )[ 0 ]).toString();

	return Intl.NumberFormat( locale, {
		notation: "compact",
		compactDisplay: display,
		minimumFractionDigits: 0,
		maximumFractionDigits: fractionPolicy[ numberPart.length ] ?? 0
	})
	.format( num );
}
