/**
 * This function takes a scroll event and calculates the scrolling
 * direction, along with metrics for visible, scrollable, and
 * unseen areas.
 * 
 * The direction is determined as vertical or horizontal, and returned
 * along with relevant metrics.
 * 
 * @param {Event} evt scroll event object
 * @param {LatestScrollMetrics} metrics latest scroll metrics
 * @return {ScrollMetrics}
 */
export default function useScrollEvent(
	{ target },
	{ latestScrollTop = 0, latestScrollLeft = 0, biggestScrollLeft = 0, biggestScrollTop = 0 } = {}
)
{
	target = target === document
		? document.scrollingElement
		: target;

	const { clientHeight, clientWidth, scrollTop, scrollLeft, scrollHeight, scrollWidth } = target;
	const vertical = calcDirection( "down", null, "up", [ scrollTop, latestScrollTop ]);
	const horizontal = calcDirection( "right", null, "left", [ scrollLeft, latestScrollLeft ]);
	const direction = ( vertical && "vertical" ) || ( horizontal && "horizontal" );
	let visible = 0, scrollable = 0, scrolled = 0;
	let seen = 0, unseen = 0, maxScrolled = 0;

	if( direction == "vertical" )
	{
		visible = clientHeight;
		scrollable = scrollHeight;
		scrolled = scrollTop;
		maxScrolled = biggestScrollTop;
	}
	else if( direction == "horizontal" )
	{
		visible = clientWidth;
		scrollable = scrollWidth;
		scrolled = scrollLeft;
		maxScrolled = biggestScrollLeft;
	}

	seen = scrolled + visible;
	unseen = scrollable - seen;
	maxScrolled = Math.max( maxScrolled, scrolled );

	function calcDirection( a, middle, b, [ v1, v2 ])
	{
		if( v1 === v2 )
		{
			return middle;
		}

		if( v2 > v1 )
		{
			return b;
		}

		if( v2 < v1 )
		{
			return a;
		}
	}

	return {
		maxScrolled,
		direction,
		seen,
		unseen,
		visible,
		scrolled,
		scrollable,
		vertical,
		horizontal
	}
}
/**
 * @typedef ScrollMetrics
 * @type {object}
 * @property {number} maxScrolled the furthest point reached by scrolling
 * @property {"vertical"|"horizontal"} direction scroll direction
 * @property {number} seen seen pixels
 * @property {number} unseen unseen pixels
 * @property {number} visible the area covered by the scrollable content
 * on the screen
 * @property {number} scrolled currently scrolled pixels
 * @property {number} scrollable total scrollable pixels
 * @property {"up"|"down"} vertical whether the vertical direction is
 * towards the up or the down
 * @property {"left"|"right"} horizontal whether the horizontal direction
 * is towards the left or the right
 */
/**
 * @typedef LatestScrollMetrics
 * @type {object}
 * @property {number} [latestScrollTop=0] latest vertically scrolled pixel
 * @property {number} [latestScrollLeft=0] latest horizontally scrolled pixel
 * @property {number} [biggestScrollLeft=0] biggest horizontally scrolled pixel
 * @property {number} [biggestScrollTop=0] biggest vertically scrolled pixel
 */
