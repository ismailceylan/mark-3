<template>
	<!-- mark-3/components/scroll-aware-content -->
	<section ref="rootEl">
		<slot
			v-bind="
			{
				observe, biggestScrollTop, biggestScrollLeft,
				latestScrollTop, latestScrollLeft
			}"
		/>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { debounce } from "../helpers/time";
import { useIntersectionObserver, useScrollEvent } from "../composables";

const rootEl = ref( null );
const targetEl = ref( null );
const emit = defineEmits([ "scroll", "metrics" ]);

let biggestScrollTop = 0;
let latestScrollTop = 0;
let biggestScrollLeft = 0;
let latestScrollLeft = 0;

defineExpose({ scrollTo, reset });

const { factor, scrollable, delay, intersect } = defineProps(
{
	scrollable: [ String, HTMLElement, Document ],
	intersect: Function,
	delay:
	{
		type: Number,
		default: 50
	},
	factor:
	{
		type: Number,
		default: 1.2
	}
});

const onScrollThrottled = debounce( onScroll, delay );
const { observe } = useIntersectionObserver( targetEl,
{
	intersect,
	rootMargin: "-0px",
	threshold: [ 0, 1, .6 ]
});

onMounted(() =>
{
	targetEl.value = (() =>
	{
		if( typeof scrollable == "string" )
		{
			if( scrollable == "html" )
			{
				return document;
			}

			if( scrollable == "body" )
			{
				return document.body;
			}

			if( scrollable[ 0 ] == "#" )
			{
				return document.querySelector( scrollable );
			}

			return rootEl.value.querySelector( scrollable );
		}
		else
		{
			return scrollable || rootEl.value;
		}
	})();

	targetEl.value.scrollTop = latestScrollTop;
	targetEl.value.scrollLeft = latestScrollLeft;

	targetEl.value.addEventListener( "scroll", onScrollThrottled,
	{
		passive: true
	});

});

onUnmounted(() =>
	targetEl.value.removeEventListener( "scroll", onScrollThrottled )
);

function scrollTo({ top = 0, left = 0 })
{
	targetEl.value.scrollTo({ top, left });
	latestScrollTop = biggestScrollTop = top;
	latestScrollLeft = biggestScrollLeft = left;
}

function reset()
{
	biggestScrollTop = 0;
	latestScrollTop = 0;
	biggestScrollLeft = 0;
	latestScrollLeft = 0;
}

function onScroll( evt )
{
	const metrics = useScrollEvent( evt,
	{
		latestScrollTop, latestScrollLeft,
		biggestScrollLeft, biggestScrollTop
	});

	const { direction, scrollable, visible, maxScrolled, scrolled } = metrics;

	// if user scroll to one way and scroll back to starting point
	// immediately, direction variable will be null which that means
	// there was no scrolling at all
	if( ! direction )
	{
		return;
	}

	if( direction == "vertical" )
	{
		latestScrollTop = scrolled;

		if( scrolled > biggestScrollTop )
		{
			biggestScrollTop = scrolled;
		}
	}
	else if( direction == "horizontal" )
	{
		latestScrollLeft = scrolled;

		if( scrolled > biggestScrollLeft )
		{
			biggestScrollLeft = scrolled;
		}
	}

	emit( "metrics",
	{
		biggestScrollLeft, biggestScrollTop,
		latestScrollLeft, latestScrollTop,
		...metrics
	});

	if( scrollable - visible - maxScrolled < visible * factor )
	{
		emit( "scroll", metrics );
	}
}

</script>
