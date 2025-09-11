import { type Ref, ref } from "vue";
import { useEventListener } from ".";

/**
 * Creates a reactive reference that tracks whether the given media query matches the current viewport.
 *
 * @param query - A valid media query string.
 * @returns A reactive reference to the match status.
 * @example
 * const isMobileRef = useMediaQuery( "(max-width: 767px)",
 * {
 *     onChange: matches => console.log( matches )
 * });
 */
export default function useMediaQuery(
	query: string,
	{ persistent = false, onChange }: UseMediaQueryOptions = {}
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
		onChange && onChange( matches.value );
	}

	return matches;
}

type ChangeListener = ( matches: boolean ) => void;

interface UseMediaQueryOptions
{
	/** Whether to persist the match status across component mounts and unmounts */
	persistent?: boolean;
	/**
	 * A function that will be called whenever the match status
	 * changes. The function will receive the current match status
	 * as a boolean argument.
	 */
	onChange?: ChangeListener;
}
