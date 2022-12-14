<template>
	<main :class="styles.container">
		<h2 :class="styles.label">Base Salary Range</h2>
		<div :class="styles.distributor">
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
	data() {
		return {
			styles: {
				container: 'shadow-[0_1px_6px_2px_rgba(0,0,0,0.15)] p-6 rounded-lg',
				label: 'text-left font-extrabold mb-4 text-lg',
				distributor: 'flex justify-between gap-4'
			}
		}
	},
	components: {
		SalaryData
	}
})
</script>
