/**
 * Calculate the number of seconds remaining between the current time
 * and a target time.
 * 
 * @param target - The target time. Can be a number of seconds, a Date
 * object, or a string that can be parsed to a Date object.
 * @returns The number of seconds remaining between the current time
 * and the target time.
 */
export default function secondsRemaining( target: number | Date | string ): number
{
	const now = Date.now() / 1000;
	const targetSec = target instanceof Date
		? target.getTime() / 1000
		: typeof target === "number"
			? target
			: new Date( target ).getTime() / 1000;

	return Math.floor( targetSec - now );
}
