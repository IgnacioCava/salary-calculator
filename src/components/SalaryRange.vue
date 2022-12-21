<template>
	<main :class="styles.container">
		<h2 :class="styles.label">Base Salary Range</h2>
		<div :class="styles.distributor">
			<SalaryData label="Minimum" type="minSalary" />
			<SalaryData label="Midpoint" type="midSalary" />
			<SalaryData label="Maximum" type="maxSalary" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SalaryData from './SalaryData.vue'

export default defineComponent({
	name: 'SalaryRange',
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
