import { useEventListener } from ".";

/**
 * Watches for clicks outside of the given element and calls the
 *   callback when it happens.
 * 
 * This is useful for things like dropdowns, where you want to close
 *   the dropdown when the user clicks outside of it.
 * 
 * This is a composition function that uses useEventListener under the
 *   hood. So, it will automatically remove the event listener when the
 *   component is unmounted.
 * 
 * It also returns a function that can be used to remove the event
 *   listener. This is useful for when you want to remove the event
 *   listener when the extraordinary circumstances arise.
 * 
 * @typedef {import('vue').Ref<Element>} ElementRef
 * @param {ElementRef[]} elRefs - The elements to watch for clicks outside of.
 * @param {function} callback - The callback to call when a click is outside of the element.
 * @param {object} options - The options object.
 * @property {string} options.on - The event to listen for.
 * @returns {function}
 * @example
 * const elRef = ref();
 * 
 * useOutsideClick( elRef, () =>
 *     console.log( "Clicked outside!" )
 * );
 * @example
 * const elRef = ref();
 * 
 * useOutsideClick(
 *     elRef,
 *     () => console.log( "Clicked outside!" ),
 *     {
 *         on: "mousedown"
 *     }
 * );
 */
export default function useOutsideClick( elRefs, callback, { on = "click" } = {})
{
	return useEventListener( document, on, e =>
	{
		if( elRefs.length === 0 )
		{
			return;
		}

		for( let el of elRefs )
		{
			el = el.value;

			if( el?.contains( e.target ))
			{
				return;
			}
		}

		callback( e );
	});
}
