import { onMounted, onUnmounted, getCurrentInstance } from "vue";

/**
 * A composition function that adds a DOM event listener to the given target with the
 * given event name and callback. The options object is optional. If the composition
 * function is called from within a component, then the event listener is added when
 * the component is mounted and removed when the component is unmounted. If the
 * composition function is called outside of a component, then the event listener is
 * added immediately and must be removed manually by calling the returned function.
 *
 * @param {Element} target - The target element to add the event listener to.
 * @param {string} eventName - The name of the event to add a listener for.
 * @param {function} callBack - The callback function to call when the event happens.
 * @param {object} [options] - The options object to pass to addEventListener.
 * @returns {function} - A function that can be called to remove the event listener.
 */
export default function useEventListener( target, eventName, callBack, options )
{
	if( getCurrentInstance())
	{
		onMounted( listen );
		onUnmounted( stop );
	}
	else
	{
		listen();
	}

	function listen()
	{
		target.addEventListener( eventName, callBack, options );
	}

	function stop()
	{
		target.removeEventListener( eventName, callBack );
	}

	return stop;
}
