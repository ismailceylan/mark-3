import { ref, watch, reactive, computed, onMounted, onUnmounted } from "vue";
import { useEventListener } from ".";

/**
 * A composition function that detects swipe gestures on a given element and provides
 * reactive properties related to the swipe event.
 *
 * @param {Ref<EventTarget>|EventTarget} maybeRefEl - The element to detect swipe gestures on.
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.threshold=50] - The minimum distance in pixels to consider a swipe.
 * @param {boolean} [options.disableTextSelect=false] - Whether to disable text selection during swipe.
 * @returns {PointerSwipeReturnValue} - An object containing reactive properties related to the swipe:
 */
export default function usePointerSwipe( maybeRefEl, { threshold = 50, disableTextSelect = false } = {})
{
	const { abs, max } = Math;
	const isSwiping = ref( false );
	const posStart = reactive({ x: 0, y: 0 });
	const posEnd = reactive({ x: 0, y: 0 });
	const timeStart = ref( 0 );
	const timeEnd = ref( 0 );
	const distanceX = ref( 0 );
	const distanceY = ref( 0 );

	const timePassed = computed(() => timeEnd.value - timeStart.value );

	const isThresholdExceeded = computed(() =>
		max(abs( distanceX.value ), abs( distanceY.value )) >= threshold
	);

	const direction = computed(() =>
	{
		if( ! isThresholdExceeded.value )
		{
			return "none";
		}

		if( abs( distanceX.value ) > abs( distanceY.value ))
		{
			return distanceX.value > 0
				? "left"
				: "right";
		}

		return distanceY.value > 0
			? "up"
			: "down";
	});

	const velocity = computed(() =>
	{
		if( direction.value === "none" )
		{
			return 0;
		}

		const distance = [ "up", "down" ].includes( direction.value )
			? distanceY.value
			: distanceX.value;

		return abs( distance / timePassed.value );
	});

	watch( maybeRefEl, () =>
	{
		useEventListener( maybeRefEl, "pointerdown", e =>
		{
			isSwiping.value = true;
			posStart.x = e.clientX;
			posStart.y = e.clientY;
			timeStart.value = performance.now();
	
			const stopListeningMove = useEventListener( maybeRefEl, "pointermove", e =>
			{
				posEnd.x = e.clientX;
				posEnd.y = e.clientY;
				distanceX.value = posEnd.x - posStart.x;
				distanceY.value = posEnd.y - posStart.y;
			});
	
			useEventListener( maybeRefEl, "pointerup", () =>
			{
				isSwiping.value = false;
				timeEnd.value = performance.now();
	
				stopListeningMove();
			},{ once: true });
		});
	}, { immediate: true });

	onMounted(() =>
	{
		if( disableTextSelect )
		{
			document.documentElement.style.setProperty( "user-select", "none" );
		}
	});

	onUnmounted(() =>
	{
		if( disableTextSelect )
		{
			document.documentElement.style.removeProperty( "user-select" );
		}
	});

	return {
		isSwiping,
		posStart,
		posEnd,
		distanceX,
		distanceY,
		isThresholdExceeded,
		direction,
		velocity
	}
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
 * @typedef {object} PointerSwipeReturnValue
 * @property {Ref<boolean>} isSwiping - Indicates if a swipe is currently happening.
 * @property {Reactive<{x: number, y: number}>} posStart - The starting position of the swipe.
 * @property {Reactive<{x: number, y: number}>} posEnd - The ending position of the swipe.
 * @property {Ref<number>} distanceX - The horizontal distance swiped.
 * @property {Ref<number>} distanceY - The vertical distance swiped.
 * @property {ComputedRef<boolean>} isThresholdExceeded - Whether the swipe exceeded the threshold.
 * @property {ComputedRef<"left"|"right"|"up"|"down"|"none">} direction - The direction of the swipe.
 * @property {ComputedRef<number>} velocity - The velocity of the swipe.
 */