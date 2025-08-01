/**
 * Returns the type name of a given variable.
 *
 * @param {any} variable - The variable whose type name is to be determined.
 * @return {string} The type name of the variable.
 */
export default function getTypeName( variable ) 
{
	return Object.prototype
		.toString
		.call( variable )
		.match( /\[object (.*)\]/ )[ 1 ];
}
