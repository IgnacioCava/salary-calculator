<template>
	<div>
		Department
		<ul>
			<li v-for="opt in options" :key="opt" class="text-3xl">
				{{ opt }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: 'DropDown',
	props: {
		options: Array as PropType<string[]>
	}
})
</script>
