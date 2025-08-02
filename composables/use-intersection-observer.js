import { unref, onMounted } from "vue";

/**
 * A composition function that creates an IntersectionObserver instance and
 * provides a method to observe the provided elements.
 *
 * @param {Ref<Element>|Element} maybeRefSourceElement - The source element
 *   that the observer will observe for intersection.
 * @param {Object} [options] - The options to pass to the IntersectionObserver
 *   constructor.
 * @returns {{ observe: (el: Element) => void, observer: IntersectionObserver }}
 *   A object with two properties. The `observe` property is a function that
 *   takes an element to observe and the `observer` property is the created
 *   IntersectionObserver instance.
 */
export default function useIntersectionObserver( maybeRefSourceElement, options = {})
{
	let observer;
	
	onMounted( init );

	function init()
	{
		options.source = unref( maybeRefSourceElement );
		observer = new IntersectionObserver( handleObservations, options );
	}
	
	function handleObservations( entries )
	{
		requestAnimationFrame(() =>
		{
			for( const { target: { item }, isIntersecting } of entries )
			{
				if( options.intersect )
				{
					options.intersect( item, isIntersecting );
				}
				else
				{
					item.isIntersecting = isIntersecting;
				}
			}
		});
	}

	function observe( item )
	{
		return el =>
		{
			if( ! el )
			{
				return;
			}
	
			el.item = item;

			if( ! observer )
			{
				init();
			}
	
			observer && observer.observe( el );
		}
	}

	return { observe, observer }
}
