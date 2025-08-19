import { ref, watch, type Ref } from "vue";
import { usePointerSwipe } from ".";

export interface SwipeableDrawerReturnValue
{
	swipeableEl: Ref<HTMLElement | null>
	swipeTriggerEl: Ref<HTMLElement | null>
	isSwiping: Ref<boolean>
	swipeDistance: Ref<number>
	isDrawerOpen: Ref<boolean>
	openDrawer: () => void
	closeDrawer: () => void
	toggleDrawer: () => void
}

interface UseSwipeableDrawerOptions
{
	drawerSize?: number
	axis?: "horizontal" | "vertical"
	openFrom?: "left" | "right" | "up" | "down"
}

const motionReversalMap: Record<"left" | "right" | "up" | "down", "left" | "right" | "up" | "down"> =
{
	left: "right",
	right: "left",
	up: "down",
	down: "up",
}

/**
 * A composition function that makes an element swipeable and provides reactive
 * properties related to the swiping gesture.
 */
export default function useSwipeableDrawer(
	{ drawerSize = 0, axis = "horizontal", openFrom = "left" }: UseSwipeableDrawerOptions = {}
): SwipeableDrawerReturnValue
{
	const swipeDistance = ref( 0 );
	const swipeableEl = ref<HTMLElement|null>( null );
	const swipeTriggerEl = ref<HTMLElement|null>( null );
	const isDrawerOpen = ref( false );
	const { min, max } = Math;

	const { isSwiping, distanceX, distanceY, direction, velocity } = usePointerSwipe( swipeTriggerEl,
	{
    	threshold: 0
	});

	const axialDistance = { horizontal: distanceX, vertical: distanceY }[ axis ];

 	watch(axialDistance, () =>
	{
		// opening movement
		if( direction.value === openFrom )
		{
			if( isDrawerOpen.value )
			{
				return;
			}

			swipeDistance.value = min( drawerSize, axialDistance.value );
		}
		// closing movement
		else if( direction.value === reverse( openFrom ))
		{
			if( ! isDrawerOpen.value )
			{
				return;
			}

			swipeDistance.value = max( 0, drawerSize + axialDistance.value );
		}
	});

	watch( isSwiping, () =>
	{
		if( isSwiping.value )
		{
			return;
		}

		// opening movement
		if( direction.value === openFrom )
		{
			velocity.value >= 0.25 || swipeDistance.value > 0.35 * drawerSize
				? open()
				: close();
		}
		// closing movement
		else if( direction.value === reverse( openFrom ))
		{
			velocity.value >= 0.25 || swipeDistance.value < 0.65 * drawerSize
				? close()
				: open();
		}
		// movements on the other axis
		else
		{
			close();
		}
	});

	function open()
	{
		swipeDistance.value = drawerSize;
		isDrawerOpen.value = true;
	}

	function close()
	{
		swipeDistance.value = 0;
		isDrawerOpen.value = false;
	}

	function toggle()
	{
		isDrawerOpen.value? close() : open();
	}

	function reverse( motion: "left" | "right" | "up" | "down" )
	{
		return motionReversalMap[ motion ];
	}

	const returnValue: SwipeableDrawerReturnValue =
	{
		swipeableEl,
		swipeTriggerEl,
		isSwiping,
		swipeDistance,
		isDrawerOpen,
		openDrawer: open,
		closeDrawer: close,
		toggleDrawer: toggle,
	}

	return returnValue;
}
