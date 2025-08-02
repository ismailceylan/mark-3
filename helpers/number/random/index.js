import { clamp } from "..";

/**
 * Produce a random number between two values. If no value is provided,
 * a random number is produced.
 *
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {boolean} shouldFloat should the result be a float
 * @return {number}
 */
export default function random( min = 0, max = 1, shouldFloat = false )
{
	if( min > max )
	{
		[ min, max ] = [ max, min ];
	}

	const rnd = clamp( Math.random() * max, min, max );

	return shouldFloat
		? parseFloat( rnd )
		: Math.floor( rnd );
}
