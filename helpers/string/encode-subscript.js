const map =
{ 
	0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉",
	a: "ₐ", e: "ₑ", h: "ₕ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", s: "ₛ",
	t: "ₜ", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
}

/**
 * Converts a given string into its subscript equivalent, if available.
 *
 * @param {string} str - The string to be converted.
 * @param {boolean} [rollbackWhenMismatch=true] If true, returns the original string
 *  a character is not in the map.
 * @returns {string} The subscript representation of the string if it exists in the
 * map, otherwise the original string.
 */
export default function encodeSubscript( str, rollbackWhenMismatch = true )
{
	if( typeof str !== "string" )
	{
		return str;
	}

	if( rollbackWhenMismatch )
	{
		let stack = "";

		for( let char of str )
		{
			if( ! ( char in map ))
			{
				return str;
			}

			stack += map[ char ];
		}

		return stack;
	}
	
	return str
		.split( "" )
		.map( char => map[ char ] || char )
		.join( "" );
}
