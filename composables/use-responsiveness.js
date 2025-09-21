import { reactive, toRefs } from "vue";
import { camelToDash } from "../helpers/string";
import { useMediaQuery } from ".";

/**
 * Reactive media query states for multiple breakpoints at once using
 *   useMediaQuery composable under the hood and returns an object of
 *   reactive media query states.
 * 
 * The object keys are the same as the keys of the rules object.
 * 
 * If the media queries you pass to the useResponsiveness composable
 *   are min- prefixed, the relevant props of returned object will be
 *   true if the screen is at least or more in that breakpoint. But if
 *   the queries are min- and max- prefixed, the relevant props of the
 *   reactive object that returned will be true if the screen is exactly
 *   in that breakpoint.
 * 
 * You can pass any valid media query to the useResponsiveness composable
 *   like color schemes, display modes, and more.
 * 
 * @typedef {import('vue').Ref} Ref
 * @typedef {import('vue').Reactive} Reactive
 * @param {Object} rules Object of media queries
 * @returns {Reactive<{}>|Ref<boolean>} Object of reactive media query states
 * @example
 * const breakpoints = useResponsiveness({
 *     mobile: "(max-width: 767px)",
 *     tablet: "(min-width: 768px) and (max-width: 1023px)",
 *     desktop: "(min-width: 1024px)",
 * });
 * // { mobile: false, tablet: false, desktop: true}
 * // every property tells the screen is exactly in that breakpoint
 * @example
 * const breakpoints = useResponsiveness({
 *     mobile: "(min-width: 300px)",
 *     tablet: "(min-width: 768px)",
 *     desktop: "(min-width: 1024px)",
 * });
 * // { mobile: true, tablet: true, desktop: false}
 * // every property tells the screen is at least or more in that breakpoint
 */
export default function useResponsiveness( rules = {})
{
	const breakpoints = reactive({});
	const keys = Object.keys( rules );

	for( const name in rules )
	{
		useMediaQuery( rules[ name ],
		{
			onChange: isActive =>
				breakpoints[ camelToDash( name )] = isActive
		});
	}

	if( keys.length === 1 )
	{
		return toRefs( breakpoints )[ keys[ 0 ]];
	}

	return breakpoints;
}
