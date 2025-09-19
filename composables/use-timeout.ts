import { ref, onUnmounted } from "vue";

/**
 * A utility function that wraps setTimeout and provides a way to clear the timeout.
 * It also provides a ref that is set to true when the timeout is ready.
 *
 * @returns An object containing the ready ref and the start and stop functions.
 */
export default function useTimeout(
	{ autostart = false, persistent = false, callback, delay = 0 }: TimeoutOptions = {}
)
{
	const ready = ref( false );
	let timer = null;

	if( ! persistent )
	{
		onUnmounted( stop );
	}

	if( autostart )
	{
		start();
	}

	/**
	 * Starts the timeout.
	 * 
	 * If the timeout is already running, it will be cleared first.
	 * 
	 * @param newCallback The new callback to be executed when the timeout is ready.
	 * @param newDelay The new delay in milliseconds.
	 */
	function start( newCallback?: () => void, newDelay?: number )
	{
		stop();

		timer = setTimeout(() =>
		{
			( newCallback || callback )?.();
			ready.value = true;
		}, newDelay || delay );
	}

	/**
	 * Clears the timeout and sets the ready ref to false.
	 */
	function stop()
	{
		if( timer )
		{
			clearTimeout( timer );
			timer = null;
			ready.value = false;
		}
	}

	return { ready, start, stop };
}

interface TimeoutOptions
{
	/** Start the timeout without calling the start method. Default: false */
	autostart?: boolean;
	/** Keep active the timeout when the component unmounts. Default: false */
	persistent?: boolean;
	/** The callback to be executed when the timeout is ready. Default: undefined */
	callback?: Function;
	/** The delay in milliseconds. Default: 0 */
	delay?: number;
}
