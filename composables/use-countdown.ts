import type { Ref, ComputedRef } from "vue";
import { ref, watch, computed, onUnmounted, getCurrentInstance } from "vue";

/**
 * Returns an object containing refs for the countdown's left seconds,
 * ready state, and methods to start, stop, restart, and finish the countdown.
 */
export default function useCountdown({
	seconds = 5,
	delay = 1000,
	autostart = true,
	persistent = false,
	onReady,
	formatter
}: UseCountdownOptions ): UseCountdownReturnValue
{
	seconds = Math.max( 0, seconds );

	let timer: Timer;
	const left = ref( seconds );
	const ready = computed(() => left.value === 0 );
	const formattedLeft = computed(() =>
		formatter?.( left.value ) || left.value.toString()
	);

	watch( ready, () => ready.value && onReady?.(), { immediate: true });

	if( ! persistent && getCurrentInstance())
	{
		onUnmounted( stop );
	}

	if( autostart )
	{
		start();
	}

	function start()
	{
		stop();
		timer = setInterval(() => left.value = Math.max( 0, left.value - 1 ), delay );
	}

	function stop()
	{
		clearInterval( timer );
	}

	function restart( seconds: number )
	{
		stop();
		left.value = seconds;
		start();
	}

	function finish()
	{
		stop();
		left.value = 0;
	}

	return { left, ready, start, stop, restart, finish, formattedLeft };
}

interface UseCountdownOptions
{
	/** The number of seconds to count down from */
	seconds: number;
	/** The number of milliseconds to delay the countdown */
	delay?: number;
	/**
	 * Whether the countdown should be persistent or should
	 * stop when the current component is unmounted
	 */
	persistent?: boolean;
	/** Whether the countdown should start automatically */
	autostart?: boolean;
	/** Function to format the countdown value */
	formatter?: ( seconds: number ) => string;
	/** Function to call when there is nothing to count down */
	onReady?: () => void;
}

interface UseCountdownReturnValue
{
	/** The number of seconds left */
	left: Ref<number>;
	/** The formatted number of seconds left */
	formattedLeft: ComputedRef<string>;
	/** Whether the countdown is at 0 */
	ready: Ref<boolean>;
	/** Starts the countdown */
	start: () => void;
	/** Stops the countdown */
	stop: () => void;
	/** Restarts the countdown with the specified number of seconds */
	restart: ( seconds: number ) => void;
	/** Finishes the countdown immediately */
	finish: () => void;
}

type Timer = ReturnType<typeof setInterval>;
