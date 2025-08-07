const map =
{
	1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 0: "⁰",
	a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ",
	k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ",
	v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
}

/**
 * Converts a given string into its superscript equivalent, if available.
 *
 * @param {string} str - The string to be converted.
 * @param {boolean} [rollbackWhenMismatch=true] If true, returns the original string
 * when a character is not in the map.
 * @returns {string} The superscript representation of the string if it exists in the
 * map, otherwise the original string.
 */
export default function convertToSuperscript( str, rollbackWhenMismatch = true )
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
