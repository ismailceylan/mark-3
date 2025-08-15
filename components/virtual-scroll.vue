<template>
	<!-- Mark-3/VirtualScroll -->
	<div ref="container">
		<div :style="{ transform: 'translateZ(0)', position: 'relative', minHeight: totalHeight + 'px' }">
			<slot
				v-for="{ item, index } of visibleItems"
				:key="item.id"
				:item
				:index
				:observe
				:style="{ position: 'absolute', transform: 'translateY(' + offsets[ index ] + 'px)' }"
			/>
		</div>

		<slot name="bottom" />
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, reactive } from "vue";
import { useCssMetrics, useEventListener, useResizeObserver, useScrollPosition } from "../composables";
import { debounce } from "../helpers/time";
import { clamp } from "../helpers/number";

const emit = defineEmits([ "threshold-reached" ]);

const props = defineProps(
{
	pageMode: Boolean,

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
const container = ref<HTMLElement>( null );
const metrics = useCssMetrics( props.itemGapClasses, [ "gap" ] as const, { throttle: 100 });

const scrollableElement = computed(() =>
	props.pageMode
		? window
		: container.value
);

const scrollPos = useScrollPosition( scrollableElement, { throttle: 50 });

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

	return h;
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

		heights.value[ index ] = max( newHeight + metrics.value.gap, oldHeight );
	});
});

watch( endIndex, () =>
{
	if(( identifiedItems.length - 1 ) - endIndex.value <= props.threshold )
	{
		emit( "threshold-reached" );
	}
});

watch( props.items, items =>
{
	const normalizedItems = items.map(( item, i ) =>
	({
		item,
		index: i
	}));

	identifiedItems.length = 0;
	identifiedItems.push( ...normalizedItems );
});

watch( props.items, items =>
{
	heights.value = items.map(( _, i ) =>
		heights.value[ i ] ?? props.minHeight
	);
});

useEventListener( window, "resize", debounce(() =>
{
	heights.value = identifiedItems.map(() => props.minHeight );
}, 250 ), { passive: true });

</script>
