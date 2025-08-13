import { ref, onMounted, onUnmounted, Ref } from "vue";
import { useResizeObserver } from ".";

/**
 * Creates a reactive reference containing numeric values of specified CSS properties
 * for elements with given classes. It observes size changes and updates the metrics
 * accordingly.
 *
 * @template P
 * @param classes - CSS classes to apply to the ghost element used for measurement.
 * @param properties - Array of CSS property names to track.
 * @param options - Optional configuration object.
 * @returns A reactive reference with the current values of the specified CSS properties.
 */
export default function useCssMetrics<P extends readonly string[]>(
	classes: string|string[],
	properties: P, { throttle = 0 } = {}
): Ref<{[ K in typeof properties[ number ]]: number }>
{
	const metrics = ref({});
	let ghostEl = null;
	let widthEl = null;
	let observer = null;
	const { observe, unobserve, disconnect } = useResizeObserver( updateMetrics, { throttle });

	function updateMetrics()
	{
		if( ! ghostEl )
		{
			return;
		}

		const computed = getComputedStyle( ghostEl );
		const computed2 = getComputedStyle( widthEl );

		properties.forEach( prop =>
		{
			const source = [ "width", "height" ].includes( prop )
				? computed2
				: computed;
			
			metrics.value[ prop ] = parseFloat( source.getPropertyValue( prop )) || 0;
		});
	}

	function init()
	{
		if( ghostEl )
		{
			return;
		}

		ghostEl = document.createElement( "div" );
		widthEl = document.createElement( "div" );

		const ghostStyle = ghostEl.style;
		const widthStyle = widthEl.style;

		ghostStyle.position = "absolute";
		ghostStyle.top = "0";
		ghostStyle.left = "0";
		ghostStyle.width = "100%";
		ghostStyle.height = "100%";
		ghostStyle.visibility = "hidden";
		ghostStyle.pointerEvents = "none";

		widthStyle.position = "absolute";
		widthStyle.visibility = "hidden";
		widthStyle.pointerEvents = "none";

		ghostEl.appendChild( widthEl );

		const cls = Array.isArray( classes )
			? classes
			: classes.split( " " );

		ghostEl.classList.add( ...cls );
		widthEl.classList.add( ...cls );

		document.body.appendChild( ghostEl );

		observe( ghostEl );
		updateMetrics();
	}

	function destroy()
	{
		if( observer && ghostEl )
		{
			unobserve( ghostEl );
			disconnect();
		}

		if( ghostEl && ghostEl.parentElement )
		{
			ghostEl.parentElement.removeChild( ghostEl );
		}

		ghostEl = null;
	}

	onMounted( init );
	onUnmounted( destroy );

	return metrics;
}
