/**
 * Checks if the given value is a plain object.
 *
 * @param {any} value - The value to be checked.
 * @return {boolean} true if the value is a plain object, false otherwise.
 */
export default function isPlainObject( value )
{
	if( typeof value !== "object" || value === null )
	{
		return false;
	}

	const proto = Object.getPrototypeOf( value );
	
	return proto === Object.prototype || proto === null;
}
