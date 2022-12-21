<template>
	<div :class="styles.container">
		<span :class="styles.label">{{ label }}</span>
		<div :class="styles.salaryContainer">
			<span :class="styles.mainSalary">$ {{ type && result[type] }}</span>
			<span :class="styles.usd">USD</span>
		</div>
		<div :class="styles.salaryDetail">
			<span class="font-bold text-sm text-base-pay">{{ result.basePayPercentage }} Base Pay </span>
			<span :class="styles.calculated">$ {{ percentageValue }}</span>
		</div>
		<div v-if="remainingBase" :class="styles.salaryDetail">
			<span class="font-bold text-sm text-OTE">{{ remainingBase }}% On Target Earning </span>
			<span :class="styles.calculated">$ {{ OTEValue }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { OTE, formatNumber, percentage } from '@/store/helpers'

export default defineComponent({
	name: 'SalaryData',
	setup(props) {
		const store = useStore()
		const result = computed(() => store.getters.result)
		const percentageValue = computed(() => percentage(result.value[props.type || ''], result.value.basePayPercentage))
		const OTEValue = computed(() => OTE(result.value[props.type || ''], percentageValue.value))
		return {
			result,
			percentageValue: computed(() => formatNumber(percentageValue.value)),
			OTEValue: computed(() => formatNumber(OTEValue.value)),
			remainingBase: computed(() => 100 - parseInt(result.value.basePayPercentage))
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
	props: {
		type: String,
		label: String
	}
})
</script>
