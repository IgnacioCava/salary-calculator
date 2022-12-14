<template>
	<main class="">
		<h2 class="text-left">Base Salary Range</h2>
		<div class="flex gap-4">
			<SalaryData :salary="data.minSalary" :base="data.basePayPercentage" :calculated="data.calculated?.min" label="Minimum" />
			<SalaryData :salary="data.midSalary" :base="data.basePayPercentage" :calculated="data.calculated?.mid" label="Midpoint" />
			<SalaryData :salary="data.maxSalary" :base="data.basePayPercentage" :calculated="data.calculated?.max" label="Maximum" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import SalaryData from './SalaryData.vue'

export default defineComponent({
	name: 'SalaryRange',
	setup() {
		const store = useStore()
		return {
			data: computed(() => store.state.found.result)
		}
	},
	components: {
		SalaryData
	}
})
</script>
