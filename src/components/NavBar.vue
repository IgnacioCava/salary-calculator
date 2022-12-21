<template>
	<nav :class="staticStyles.container">
		<DropDown @select="fetchJobs" :options="departments" label="Department" type="department" icon="fa-layer-group" />
		<DropDown @select="fetchLevels" :options="jobs" label="Job title" type="job" controledBy="department" icon="fa-user" />
		<DropDown @select="fetchResult" :options="levels" label="Level" type="level" controledBy="job" icon="fa-user" />
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
			departments: computed(() => store.getters.departments),
			jobs: computed(() => store.getters.jobs),
			levels: computed(() => store.getters.levels),
			clear: () => store.dispatch('clearFields'),
			fetchJobs: computed(() => (department: string) => store.dispatch('fetchJobs', department)),
			fetchLevels: computed(() => (job: string) => store.dispatch('fetchLevels', job)),
			fetchResult: computed(() => (level: number) => store.dispatch('fetchResult', level))
		}
	},

	components: {
		DropDown
	}
})
</script>
