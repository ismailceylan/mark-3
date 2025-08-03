/**
 * Checks if a value is numeric or can be converted to a number.
 * 
 * @param {any} value - The value to be checked.
 * @returns {boolean} true if the value is numeric, false otherwise.
 */
export default function isNumeric( value )
{
	if( typeof value === "number" )
	{
    	return ! isNaN( value ) && isFinite( value );
	}

	if( typeof value === "string" )
	{
		return value.trim() !== "" &&
		       ! isNaN( Number( value )) &&
			   isFinite( Number( value ));
	}

	return false;
}
