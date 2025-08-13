/**
 * Throttle a function call to ensure it's not called more often than the specified delay.
 * 
 * This is useful for limiting the rate at which a function can be invoked, 
 * such as during events that trigger rapidly like window resize or scroll.
 * 
 * @example
 * const throttled = throttle(() => console.log("Hello"), 1000);
 * setInterval( throttled, 100 );
 * // Output: "Hello" once every second
 * 
 * @param {function} func The function to throttle.
 * @param {number} delay The delay in milliseconds.
 * @returns {function} A throttled version of the input function.
 */
export default function throttle( func, delay )
{
	let lastCall = 0;

	return function( ...args )
	{
		const now = Date.now();

		if( now - lastCall >= delay )
		{
			lastCall = now;
			func.apply( this, args );
		}
	}
}
