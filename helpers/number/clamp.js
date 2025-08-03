/**
 * Clamps a value within a range.
 *
 * @param {number} value value to be clamped
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @return {number} clamped value
 */
export default function clamp( value, min, max )
{
	if( min > max )
	{
		[ min, max ] = [ max, min ];
	}

	return Math.max( min, Math.min( max, value ));
}
