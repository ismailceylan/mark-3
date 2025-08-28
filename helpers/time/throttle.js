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
 * @param {object} options - The options for throttling.
 * @param {boolean} [options.leading=true] - Whether to invoke the function on the leading edge of the delay.
 * @param {boolean} [options.trailing=true] - Whether to invoke the function on the trailing edge of the delay.
 * @returns {function} A throttled version of the input function.
 */
export default function throttle( func, delay, { leading = true, trailing = true } = {})
{
	let lastCall = 0;
	let timeoutId = null;
	let lastArgs;
	let lastThis;

	return function( ...args )
	{
		const now = Date.now();
		
		lastArgs = args;
		lastThis = this;

		const invoke = () =>
		{
			lastCall = Date.now();
			func.apply( lastThis, lastArgs );
			timeoutId = null;
		}

		if( lastCall === 0 && ! leading )
		{
			lastCall = now;
		}

		const remaining = delay - ( now - lastCall );

		if( remaining <= 0 )
		{
			if( timeoutId )
			{
				clearTimeout( timeoutId );
				timeoutId = null;
			}

			invoke();
		}
		else if( trailing && ! timeoutId )
		{
			// Trailing için timeout ayarla
			timeoutId = setTimeout( invoke, remaining );
		}
	}
}
