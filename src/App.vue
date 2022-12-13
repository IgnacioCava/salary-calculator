<template>
	<NavBar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import setup from './firebase/setup'

export default defineComponent({
	name: 'App',
	components: {
		NavBar
	},
	beforeCreate() {
		setup()
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
