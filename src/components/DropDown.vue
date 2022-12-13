<template>
	<div class="text-left relative">
		<span class="text-dropdown-label font-semibold text-sm">{{
			label
		}}</span>
		<div
			@click.prevent="toggle"
			:class="isOpen && 'border-dropdown-border-selected'"
			class="flex box-content items-center border-solid border-2 border-dropdown-border-default w-fit text-dropdown-selected-none h-8 rounded gap-8 px-2 py-1 hover:border-dropdown-border-selected">
			<p class="text-lg">{{ label }}</p>
			<img :src="chevron" class="h-full py-2.5" />
		</div>
		<div
			v-if="isOpen"
			class="absolute top-full border-solid border-2 border-dropdown-border-default w-full mt-[2px] p-2">
			<input
				type="text"
				v-model="search"
				placeholder="Search"
				class="w-full outline-none" />
			<p
				v-for="opt in filteredList"
				:key="opt"
				class="text-lg text-dropdown-label">
				{{ opt }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import chevron from '../assets/chevron.png'

export default defineComponent({
	name: 'DropDown',
	props: {
		label: String,
		options: Array as PropType<string[]>
	},
	data: () => {
		return {
			search: '',
			isOpen: false,
			chevron
		}
	},
	mounted() {
		document.addEventListener('click', this.shouldClose)
	},
	beforeUnmount() {
		document.removeEventListener('click', this.shouldClose)
	},
	methods: {
		toggle() {
			this.isOpen = !this.isOpen
		},
		shouldClose(e: MouseEvent) {
			if (!this.$el.contains(e.target)) {
				this.isOpen = false
			}
		}
	},
	computed: {
		filteredList() {
			return this.$props.options?.filter((opt) =>
				opt.toLowerCase().includes(this.search.toLowerCase())
			)
		}
	}
})
</script>
