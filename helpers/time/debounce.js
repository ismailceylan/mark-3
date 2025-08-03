/**
 * Debounce a function call to prevent it from being called too often.
 * 
 * This is useful for functions that are called on every
 *   frame, such as onScroll. This will ensure that the function
 *   is only called at most once every `delay` milliseconds. 
 * 
 * @example
 * const debounced = debounce(() =>
 *    console.log( "Hello" ),
 *    1000
 * );
 * 
 * window.addEventListener( "scroll", debounced );
 * 
 * @param {function} callback The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {function}
 */
export default function debounce( callback, delay = 200 )
{
	let timer;

	return function debounceWrapper( ...args )
	{
		clearTimeout( timer );
		timer = setTimeout( callback.bind( this, ...args ), delay );
	}
}
