<template>
	<h1 class="text-left">Salary Calculator</h1>
	<NavBar />
	<SalaryData v-if="result.level" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
import SalaryData from './components/SalaryRange.vue'
import setup from './firebase/setup'

export default defineComponent({
	name: 'App',
	components: {
		NavBar,
		SalaryData
	},
	setup() {
		const store = useStore()

		return {
			result: computed(() => store.state.found.result)
		}
	},
	async beforeCreate() {
		const data = await setup()
		this.$store.commit('setData', data)
	}
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
}
</style>
