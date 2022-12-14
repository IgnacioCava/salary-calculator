<template>
	<nav :class="staticStyles.container">
		<DropDown :options="departments" label="Department" sets="department" icon="fa-layer-group" />
		<DropDown :options="jobs" label="Job title" sets="job" controledBy="department" :disabled="!selected.department" icon="fa-user" />
		<DropDown :options="levels" label="Level" sets="level" controledBy="job" :disabled="!selected.job" icon="fa-user" />
		<button @click.prevent="clear" :class="staticStyles.clear">Clear search</button>
	</nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import DropDown from './DropDown.vue'

export default defineComponent({
	name: 'NavBar',
	data() {
		return {
			staticStyles: {
				container: 'flex gap-4 items-end mb-24',
				clear: 'h-10 border-2 py-1 px-3 text-sm text-dropdown-selected-none font-semibold rounded-lg'
			}
		}
	},
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
