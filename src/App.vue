<template>
	<div class="py-6 px-20">
		<h1 class="text-left text-3xl font-extrabold mb-6">Salary Calculator</h1>
		<NavBar v-if="status === 'success'" />
		<SalaryRange v-if="result" />

		<div v-if="status === 'loading'">Fetching data</div>
		<div v-if="status === 'error'">Error while fetching, please reload the page</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
import SalaryRange from './components/SalaryRange.vue'

export default defineComponent({
	name: 'App',
	components: {
		NavBar,
		SalaryRange
	},
	setup() {
		const store = useStore()

		return {
			result: computed(() => store.getters.result),
			status: computed(() => store.getters.status),
			departments: computed(() => store.getters.departments)
		}
	},
	async beforeCreate() {
		//const data = await setup()
		try {
			await this.$store.dispatch('initializeStore')
		} catch (error) {
			this.$store.dispatch('setStatus', 'error')
		}

		//this.$store.commit('setData', data)
	}
})
</script>

<style>
#app {
	font-family: Inter, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
