import { onUnmounted } from "vue";
import { throttle as throttleHelper } from "../helpers/time";

/**
 * A composition function that creates a ResizeObserver instance and provides
 * methods to observe elements for their resize events.
 *
 * @param {ResizeObserverCallback} callback - The callback function
 *   to call when the observed elements are resized
 * @returns {ResizeObserverReturnValue}
 *   An object with three properties. The `observe` property is a function that
 *   takes an element to observe and begins observing it for resize events.
 *   The `unobserve` property is a function that takes an element to no longer
 *   observe and stops observing it for resize events. The `disconnect` property
 *   is a function that disconnects the ResizeObserver instance and clears the
 *   set of observed elements.
 */
export default function useResizeObserver( callback, { throttle = 0 } = {})
{
	const observedElements = new Set;
	
	const maybeThrottledCallback = throttle
		? throttleHelper( callback, throttle )
		: callback;
	
	const observer = new ResizeObserver( entries =>
	{
		maybeThrottledCallback( entries );
	});

	onUnmounted( disconnect );

	function observe( el )
	{
		if( ! el || observedElements.has( el ))
		{
			return;
		}

		observer.observe( el );
		observedElements.add( el );
	}

	function unobserve( el )
	{
		if( ! el )
		{
			return;
		}

		observer.unobserve( el );
		observedElements.delete( el );
	}

	function disconnect()
	{
		observer.disconnect();
		observedElements.clear();
	}

	return {
		observe,
		unobserve,
		disconnect
	}
}
/**
 * Callback function to be invoked when observed elements are resized.
 *
 * @callback ResizeObserverCallback
 * @param {ResizeObserverEntry[]} entries - An array of ResizeObserverEntry objects
 *   for each observed element that has changed size.
 */
/**
 * @callback ObserveMethod
 * @param {EventTarget} el - The element to observe
 * @returns {void}
 */
/**
 * @callback UnobserveMethod
 * @param {EventTarget} el - The element to stop observing
 * @returns {void}
 */
/**
 * @callback DisconnectMethod
 * @returns {void}
 */
/**
 * @typedef {object} ResizeObserverReturnValue
 * @property {ObserveMethod} observe - A function to observe an element for resize events
 * @property {UnobserveMethod} unobserve - A function to stop observing an element for resize events
 * @property {DisconnectMethod} disconnect - A function to disconnect the ResizeObserver instance
 */
