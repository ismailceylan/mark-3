import { ref } from "vue";
import { useEventListener } from ".";

/**
 * Creates a reactive reference that tracks whether the given media query matches the current viewport.
 *
 * @typedef {import('vue').Ref} Ref
 * @param {string} query - A valid media query string.
 * @param {function(boolean)} [watcher] - A function that will be called whenever the match status changes.
 * The function will receive the current match status as a boolean argument.
 * @returns {Ref<boolean>} A reactive reference to the match status.
 * @example
 * const isMobileRef = useMediaQuery( "(max-width: 767px)", matches =>
 *    console.log( matches )
 * );
 */
export default function useMediaQuery( query, watcher )
{
	const match = matchMedia( query );
	const matches = ref( match.matches );

	triggerWatcher();

	useEventListener( match, "change", e =>
		triggerWatcher( matches.value = e.matches )
	);

	function triggerWatcher()
	{
		watcher && watcher( matches.value );
	}

	return matches;
}
