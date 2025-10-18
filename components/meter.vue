<template>
	<!-- Mark-3/Meter -->
	<div ref="main" class="meter">
		<div class="percent" :style="{ width: percent + '%' }">
			<div
				class="indicator"
				:class="
				{
					heat,
					'heat-reverse': heatReverse
				}"
				:style="{ width: main?.clientWidth + 'px' }"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const { max, value } = defineProps({
	heat: Boolean,
	heatReverse: Boolean,

	max:
	{
		type: Number,
		default: 1
	},

	value:
	{
		type:  Number,
		default: 0.01
	}
});

const main = ref( null );
const percent = computed(() => value * 100 / max || 0 );

</script>

<style scoped>
.meter {
	overflow: hidden;
}

.percent {
	height: 100%;
	overflow: hidden;
}

.indicator {
	height: 100%;
	width: 100%;
	background-color: var(--cold);
}

.heat {
	background-image: linear-gradient(90deg, var(--hot), var(--normal), transparent);
}

.heat-reverse {
	background-image: linear-gradient(90deg, transparent, var(--normal), var(--hot));
}

/*# sourceURL=mark3/components/meter.vue */
</style>
