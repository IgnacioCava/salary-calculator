<template>
	<nav class="flex gap-2">
		<DropDown v-bind:options="['a', 'b']" label="Department" />
		<DropDown v-bind:options="['a', 'b']" label="Job title" />
		<DropDown v-bind:options="['a', 'b']" label="Level" />
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DropDown from './DropDown.vue'

export default defineComponent({
	name: 'NavBar',
	components: {
		DropDown
	}
})
</script>
