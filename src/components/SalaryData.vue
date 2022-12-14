<template>
	<div class="flex gap-4 flex-col text-left">
		<span>{{ label }}</span>
		<span>$ {{ salary }}</span>
		<span>{{ base }} Base Pay $ {{ format(calculated.base) }}</span>
		<span>{{ remainingBase }}% On Target Earning $ {{ format(calculated.OTE) }}</span>
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
