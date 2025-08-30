/**
 * Reduces the given number to a smaller number between 0 and 1000
 * by increasing the exponent of the number.
 * 
 * It returns an array where the first element is the reduced number
 * and the second element is its exponent.
 * 
 * @param {number} num The number to reduce.
 * @param {number} [base=1000] The base of the number.
 * @throws {Error} If the number is negative.
 * @returns {[number, number]} The reduced number and its exponent.
 */
export default function reduce( num, base = 1000 )
{
	if( num < 0 )
	{
		throw new Error( "Reducing negative numbers is not supported." );
	}

	let power = 0;
	let current = num;

	while( current >= 1 )
	{
		current /= base;
		power++;
	}

	const reducedNumber = current * base;

	return [ reducedNumber, power ];
}
