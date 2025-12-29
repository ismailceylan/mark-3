/**
 * Converts a Unix timestamp to a JavaScript Date object.
 * 
 * @template T
 * @param {number|string} timestamp - The Unix timestamp in seconds or milliseconds, or a string that can be converted to a number.
 * @param {T} [defaultValue] - The value to return if timestamp is invalid or results in an invalid Date.
 * @returns {Date|T|undefined} A Date object representing the timestamp, or the defaultValue if the timestamp is invalid.
 * 
 * This function handles both seconds and milliseconds timestamps by checking the length of the number.
 * If the timestamp is less than 1e11, it's assumed to be in seconds and is converted to milliseconds.
 * If the conversion results in an invalid Date object, the function returns the provided defaultValue
 * or undefined if no default is specified.
 */
export default function fromTimestamp( timestamp, defaultValue )
{
	const ts = typeof timestamp === "string"
		? Number( timestamp )
		: timestamp;

	if( Number.isNaN( ts ) || ts === null )
	{
		return defaultValue;
	}

	const time = ts < 1e11
		? ts * 1000
		: ts;

	const date = new Date( time );

	return isNaN( date.getTime())
  		? defaultValue
		: date;
}
