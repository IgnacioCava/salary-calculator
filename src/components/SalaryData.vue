<template>
	<div :class="styles.container">
		<span :class="styles.label">{{ label }}</span>
		<div :class="styles.salaryContainer">
			<span :class="styles.mainSalary">$ {{ salary }}</span>
			<span :class="styles.usd">USD</span>
		</div>
		<div :class="styles.salaryDetail">
			<span class="font-bold text-sm text-base-pay">{{ base }} Base Pay </span>
			<span :class="styles.calculated">$ {{ format(calculated.base) }}</span>
		</div>
		<div :class="styles.salaryDetail">
			<span class="font-bold text-sm text-OTE">{{ remainingBase }}% On Target Earning </span>
			<span :class="styles.calculated">$ {{ format(calculated.OTE) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'SalaryData',
	setup() {
		const store = useStore()
		return {
			departments: computed(() => store.state.departments),
			jobs: computed(() => store.state.jobs),
			levels: computed(() => store.state.levels),
			selected: computed(() => store.state.selected)
		}
	},
	data() {
		return {
			styles: {
				container: 'flex gap-2 flex-col text-left p-4 w-1/3',
				label: 'text-sm text-dropdown-selected-none font-semibold tracking-wide',
				salaryContainer: 'flex justify-between items-center',
				mainSalary: 'text-3xl font-extrabold',
				usd: 'text-usdgreen font-bold text-sm',
				salaryDetail: 'flex items-center gap-4 indent-2',
				calculated: 'text-lg text-dropdown-selected-none'
			}
		}
	},
	methods: {
		format(number: number) {
			return number.toLocaleString().replace('.', ',')
		}
	},
	props: {
		salary: String,
		base: String,
		calculated: {
			type: Object,
			default: () => ({ base: '', OTE: '' })
		},
		label: String
	},
	computed: {
		remainingBase() {
			return 100 - (this.base ? parseInt(this.base) : 0)
		}
	}
})
</script>
