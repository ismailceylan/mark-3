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
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced version of the input function.
 */
export default function debounce<TArgs extends any[]>
(
	callback: ( ...args: TArgs ) => void,
	delay = 200
): ( ...args: TArgs ) => void
{
	let timer: ReturnType<typeof setTimeout>;

	return function debounceWrapper( this: unknown, ...args: TArgs )
	{
		clearTimeout( timer );
		timer = setTimeout(() => callback.apply(this, args), delay );
	}
}
