/**
 * Breaks an array into chunks of a given size.
 *
 * @param array Array to be chunked.
 * @param size Size of each chunk.
 * @returns A 2D array of the provided array, with each sub-array being of the given size.
 * @throws {Error} If the size is less than or equal to 0.
 */
export default function chunk<T>( array: T[], size: number ): T[][]
{
	if( size <= 0 )
	{
		throw new Error( "Size must be greater than 0" );
	}

	const result: T[][] = [];

	for( let i = 0; i < array.length; i += size )
	{
		result.push( array.slice( i, i + size ));
	}
	
	return result;
}
