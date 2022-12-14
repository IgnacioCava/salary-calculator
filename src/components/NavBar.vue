<template>
	<nav class="flex gap-4 items-end">
		<DropDown :options="departments" label="Department" sets="department" />
		<DropDown :options="jobs" label="Job title" sets="job" controledBy="department" :disabled="!selected.department" />
		<DropDown :options="levels" label="Level" sets="level" controledBy="job" :disabled="!selected.job" />
		<button @click.prevent="clear" class="h-10 border-2 border-dropdown-border-default rounded py-1 px-3 font-sans text-sm text-dropdown-selected-none font-semibold">Clear search</button>
	</nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import DropDown from './DropDown.vue'

export default defineComponent({
	name: 'NavBar',
	setup() {
		const store = useStore()
		return {
			departments: computed(() => store.state.departments),
			jobs: computed(() => store.state.jobs),
			levels: computed(() => store.state.levels),
			selected: computed(() => store.state.selected),
			clear: () => store.commit('clear')
		}
	},
	components: {
		DropDown
	}
})
</script>
