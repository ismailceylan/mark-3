import { ref, unref } from "vue"
import { useEventListener } from ".";
import { throttle as throttleHelper } from "../helpers/time";

/**
 * Tracks the scroll position of a target (window, document, or element).
 * 
 * @param {Window|Document|HTMLElement|Ref<Window|Document|HTMLElement>} target
 * @param {{throttle?:number}} [options] - The options for the scroll position tracking
 * @returns {{x:Ref<number>,y:Ref<number>}}
 */
export default function useScrollPosition( target, { throttle = 0 } = {})
{
	const x = ref( 0 );
	const y = ref( 0 );

	const getScroll = () =>
	{
		const el = unref( target );
		const rootElement = document.documentElement;
		const body = document.body;

		if( el === window )
		{
			return {
				x: window.scrollX || rootElement.scrollLeft || body.scrollLeft || 0,
				y: window.scrollY || rootElement.scrollTop || body.scrollTop || 0
			}
		}

		if( el instanceof Document )
		{
			return {
				x: rootElement.scrollLeft || body.scrollLeft || 0,
				y: rootElement.scrollTop || body.scrollTop || 0
			}
		}

		if( el instanceof HTMLElement )
		{
			return {
				x: el.scrollLeft,
				y: el.scrollTop
			}
		}

		return { x: 0, y: 0 }
	}

	const update = () =>
	{
		const pos = getScroll();

		x.value = pos.x
		y.value = pos.y
	}

	const maybeThrottledUpdate = throttle > 0
		? throttleHelper( update, throttle )
		: update;
	
	// first update
	update();

	useEventListener( target, "scroll", maybeThrottledUpdate, {
		passive: true
	});

	return { x, y }
}

/**
 * @template T
 * @typedef {import("vue").Ref<T>} Ref
 */
