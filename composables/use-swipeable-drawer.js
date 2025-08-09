import { ref, watch, provide } from "vue";
import { usePointerSwipe } from ".";

/**
 * A composition function that provides a swipeable drawer.
 *
 * @param {string} name - A unique name for the drawer.
 * @param {object} [options] - Configuration options.
 * @param {number} [options.drawerSize=0] - The width of the drawer.
 * @param {"horizontal"|"vertical"} [options.axis="horizontal"] - The axis of the drawer's movement.
 * @param {"left"|"right"|"up"|"down"} [options.openFrom="left"] - The starting position of the drawer.
 * @returns {SwipeableDrawerReturnValue} - An object containing reactive properties
 * and methods related to the drawer.
 */
export default function useSwipeableDrawer(
	name,
	{ drawerSize, axis = "horizontal", openFrom = "left" } = {}
)
{
	const swipeDistance = ref( 0 );
	const swipeableEl = ref( null );
	const swipeTriggerEl = ref( null );
	const isDrawerOpen = ref( false );
	const { min, max } = Math;

	const { isSwiping, distanceX, distanceY, direction, velocity } =
		usePointerSwipe( swipeTriggerEl,
		{
			threshold: 0
		});

	const axialDistance = (
	{
		horizontal: distanceX,
		vertical: distanceY
	})[ axis ];

	const motionReversalMap =
	{
		left: "right",
		right: "left",
		up: "down",
		down: "up"
	}

	watch( axialDistance, () =>
	{
		// opening movement
		if( direction.value == openFrom )
		{
			if( isDrawerOpen.value )
			{
				return;
			}

			swipeDistance.value = min( drawerSize, axialDistance.value );
		}
		// closing movement
		else if( direction.value == reverse( openFrom ))
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
		if( direction.value == openFrom )
		{
			velocity.value >= 0.25 || swipeDistance.value > .35 * drawerSize
				? open()
				: close();
		}
		// closing movement
		else if( direction.value == reverse( openFrom ))
		{
			velocity.value >= 0.25 || swipeDistance.value < .65 * drawerSize
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
		isDrawerOpen.value
			? close()
			: open();
	}

	function reverse( motion )
	{
		return motionReversalMap[ motion ];
	}

	const returnValue =
	{
		swipeableEl,
		swipeTriggerEl,
		isSwiping,
		swipeDistance,
		isDrawerOpen,
		openDrawer: open,
		closeDrawer: close,
		toggleDrawer: toggle
	}

	provide( "drawer:" + name, returnValue );
	
	return returnValue;
}

/**
 * @template T
 * @typedef {import("vue").Ref<T>} Ref
 */
/**
 * @template T
 * @typedef {import("vue").ComputedRef<T>} ComputedRef
 */
/**
 * @template T
 * @typedef {import("vue").Reactive<T>} Reactive
 */
/**
 * @typedef {object} SwipeableDrawerReturnValue
 * @property {Ref<EventTarget>} swipeableEl - The element that is the drawer.
 * @property {Ref<EventTarget>} swipeTriggerEl - The element that can trigger the drawer's opening.
 * @property {Ref<boolean>} isSwiping - Indicates if a swipe is currently happening.
 * @property {Ref<number>} swipeDistance - The distance of the drawer from its starting position.
 * @property {Ref<boolean>} isDrawerOpen - Indicates if the drawer is open.
 * @property {function():void} openDrawer - Opens the drawer.
 * @property {function():void} closeDrawer - Closes the drawer.
 * @property {function():void} toggleDrawer - Toggles the drawer's open state.
 */
