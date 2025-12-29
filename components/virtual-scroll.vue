<template>
	<!-- Mark-3/VirtualScroll -->
	<div ref="container">
		<div :style="{ transform: 'translateZ(0)', position: 'relative', minHeight: totalHeight + 'px' }">
			<slot
				v-for="{ item, index } of visibleItems"
				:key="index"
				:item
				:index
				:observe
				:re-measure="reMeasure.bind( null, index )"
				:has-scrollbar
				:style="{ position: 'absolute', transform: 'translateY(' + offsets[ index ] + 'px)' }"
			/>
		</div>

		<slot name="bottom" />
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, reactive, nextTick } from "vue";
import { useCssMetrics, useEventListener, useResizeObserver, useScrollPosition } from "../composables";
import { debounce } from "../helpers/time";
import { clamp } from "../helpers/number";

const emit = defineEmits([ "threshold-reached" ]);

const scrollTop = defineModel( "scrollTop", { default: 0 });

const props = defineProps(
{
	pageMode: Boolean,
	dontWatchResizing: Boolean,

	items: {
		type: Array,
		required: true
	},

	buffer: {
		type: Number,
		default: 5
	},

	minHeight: {
		type: Number,
		default: 20
	},

	itemGapClasses: {
		type: String
	},

	threshold: {
		type: Number,
		default: 3
	}
});

const { max, floor } = Math;
const heights = ref<number[]>([]);
const identifiedItems = reactive<{ item: any, index: number }[]>([]);
const container = ref<HTMLDivElement>( null );
const hasScrollbar = ref( false );
const metrics = useCssMetrics( props.itemGapClasses, [ "gap" ] as const, { throttle: 100 });
const isHeightsDirty = ref( false );
const dirtyItems = {}

const scrollableElement = computed(() =>
	props.pageMode
		? window
		: container.value
);

const scrollPos = useScrollPosition( scrollableElement, { throttle: 150 });

const offsets = computed<number[]>(() =>
{
	const arr = new Array( heights.value.length );
	let sum = 0;

	for( let i = 0; i < heights.value.length; i++ )
	{
		arr[ i ] = sum;
		sum += heights.value[ i ] || 0;
	}

	return arr;
});

const totalHeight = computed(() =>
{
	if( identifiedItems.length === 0 )
	{
		return 0;
	}

	const latestOffset = offsets.value[ offsets.value.length - 1 ] || 0;
	const latestHeight = heights.value[ heights.value.length - 1 ] || 0;
	const h = latestOffset + latestHeight;

	if( h === metrics.value.gap * 2 )
	{
		return 0;
	}

	return h + 1;
});

const startIndex = computed(() =>
{
	let low = 0;
	let high = offsets.value.length - 1;
	let mid: number;
	
	while( low <= high )
	{
		mid = floor(( low + high ) / 2 );

		if( offsets.value[ mid ] === scrollPos.y.value )
		{
			return mid;
		}
		
		if( offsets.value[ mid ] < scrollPos.y.value )
		{
			low = mid + 1;
		}
		else
		{
			high = mid - 1;
		}
	}
	
	return low - 1 < 0
		? 0
		: low - 1;
});

const endIndex = computed(() =>
{
	let total = 0;
	let idx = startIndex.value;

	while( idx < heights.value.length && total < window.innerHeight )
	{
		total += heights.value[ idx ];
		idx++;
	}
	
	return max( 0, idx - 1 );
});

const startIndexWithMargin = computed(() =>
	max( 0, startIndex.value - props.buffer )
);

const endIndexWithMargin = computed(() =>
	clamp( endIndex.value + props.buffer, 0, heights.value.length )
);

const visibleItems = computed(() =>
	identifiedItems.slice( startIndexWithMargin.value, endIndexWithMargin.value )
);

const { observe } = useResizeObserver(( entries ) =>
{
	entries.forEach( entry =>
	{
		const index = parseInt(( entry.target as HTMLElement ).dataset.index );
		const newHeight = entry.contentRect.height;
		const oldHeight = heights.value[ index ] || 0;

		heights.value[ index ] = index in dirtyItems
			// replace old height
			? newHeight + metrics.value.gap
			: max( newHeight + metrics.value.gap, oldHeight );

		delete dirtyItems[ index ];
	});
});

watch( scrollPos.y, () => scrollTop.value = scrollPos.y.value );

watch( scrollTop, async () =>
{
	await nextTick();
	
	if( scrollableElement.value instanceof HTMLElement )
	{
		scrollableElement.value.scrollTop = scrollTop.value;
	}
	else if( scrollableElement.value === window )
	{
		window.scrollTo( 0, scrollTop.value );
	}
}, { immediate: true, once: true });

watch( endIndex, () =>
{
	// prevent automatically triggering the threshold-reached event because there are not too many items
	if( scrollTop.value === 0 )
	{
		return;
	}

	if(( identifiedItems.length - 1 ) - endIndex.value <= props.threshold )
	{
		emit( "threshold-reached" );
	}
});

watch(() => props.items, items =>
{
	const normalizedItems = items.map(( item, i ) =>
	({
		item,
		index: i
	}));

	identifiedItems.length = 0;
	identifiedItems.push( ...normalizedItems );

	heights.value = items.map(( _, i ) =>
		heights.value[ i ] ?? props.minHeight
	);
}, { immediate: true, deep: true });

watch( isHeightsDirty, () =>
{
	if( isHeightsDirty.value === false )
	{
		return;
	}

	visibleItems.value.forEach(({ index }) =>
	{
		const itemEl = getItemAsElement( index );

		// the item is in the viewport area
		if( itemEl )
		{
			heights.value[ index ] = getItemHeight( itemEl );
		}
		
		// mark item as dirty, so it will be re-measured as soon as it becomes visible
		dirtyItems[ index ] = true;
	});

	isHeightsDirty.value = false;
});

watch( container, () =>
{
	nextTick(() =>
		hasScrollbar.value = container.value.scrollHeight > container.value.clientHeight
	);
});

if( props.dontWatchResizing === false )
{
	let latestWidth = 0;
	const debouncedResetHeights = debounce( resetHeights, 500 );

	useEventListener( window, "resize", () =>
	{
		const newWidth = window.innerWidth;
		
		if( newWidth !== latestWidth )
		{
			latestWidth = newWidth;
			debouncedResetHeights();
		}
	}, { passive: true });
}

function resetHeights()
{
	heights.value = identifiedItems.map(() => props.minHeight );
	isHeightsDirty.value = true;
}

function getItemAsElement( index: number )
{
	return container.value.querySelector( "[data-index='" + index + "']" );
}

function getItemHeight( el: Element )
{
	return el.getBoundingClientRect().height + metrics.value.gap;
}

function reMeasure( index: number )
{
	dirtyItems[ index ] = true;
	isHeightsDirty.value = true;
}

</script>
