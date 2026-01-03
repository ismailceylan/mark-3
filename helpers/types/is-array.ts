/**
 * Checks if a value is an array.
 * 
 * @param value - The value to be checked
 * @return true if the value is an array, false otherwise
 */
export default function isArray( value: any ): value is any[]
{
	return Array.isArray( value );
}
