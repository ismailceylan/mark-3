import { type Ref, ref } from "vue";
import { useEventListener } from ".";

/**
 * Creates a reactive reference that tracks whether the given media query matches the current viewport.
 *
 * @param query - A valid media query string.
 * @param watcher - A function that will be called whenever the match status changes.
 * The function will receive the current match status as a boolean argument.
 * @param options.persistent - Whether to persist the match status across component mounts and unmounts.
 * @returns A reactive reference to the match status.
 * @example
 * const isMobileRef = useMediaQuery( "(max-width: 767px)", matches =>
 *    console.log( matches )
 * );
 */
export default function useMediaQuery(
	query: string,
	watcher?: ( matches: boolean) => void,
	{ persistent = false } = {}
): Ref<boolean>
{
	const match = matchMedia( query );
	const matches = ref( match.matches );

	triggerWatcher();

	useEventListener(
		match, "change",
		( e: MediaQueryListEvent ) => triggerWatcher( matches.value = e.matches ),
		{ persistent }
	);

	function triggerWatcher( _?: boolean )
	{
		watcher && watcher( matches.value );
	}

	return matches;
}
