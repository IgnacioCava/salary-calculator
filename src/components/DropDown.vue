<template>
	<div :class="disabled && 'pointer-events-none'" class="text-left relative w-fit min-w-1/6 max-w-1/4 font-sans">
		<span class="text-dropdown-label font-semibold text-sm">
			{{ label }}
		</span>
		<div @click.prevent="toggle" :class="{ 'border-dropdown-border-selected': isOpen, 'border-dropdown-border-default': !isOpen, 'hover:border-dropdown-border-selected cursor-pointer': !disabled }" class="flex box-border justify-between items-center border-solid border-2 w-full text-dropdown-selected-none h-10 rounded gap-4 px-3 py-1">
			<p class="text-lg text-ellipsis whitespace-nowrap w-full overflow-hidden">{{ selected[sets || ''] || label }}</p>
			<img :src="chevron" class="h-full py-2" />
		</div>
		<div v-if="isOpen" class="flex flex-col absolute top-full border-solid border-2 border-dropdown-border-default w-full mt-[2px] p-2 gap-2 bg-white">
			<input type="text" v-model="search" placeholder="Search" class="w-full outline-none font-sans appearance-none" />
			<button v-for="opt in filteredList" :key="opt" :name="opt" class="text-md font-semibold text-dropdown-label w-100 text-left" @click.prevent="setData(opt)">
				{{ opt }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import chevron from '../assets/chevron.png'

export default defineComponent({
	name: 'DropDown',
	props: {
		label: String,
		options: Array as PropType<string[]>,
		controledBy: String,
		sets: String
	},
	data: () => {
		return {
			search: '',
			isOpen: false,
			chevron
		}
	},
	setup() {
		const store = useStore()

		return {
			selected: computed(() => store.state.selected),
			select: (type: string, value: string) => store.commit('setSelected', { type, value })
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
			if (!this.disabled) this.isOpen = !this.isOpen
		},
		shouldClose(e: MouseEvent) {
			if (!this.$el.contains(e.target)) {
				this.isOpen = false
			}
		},
		setData(value: string) {
			this.sets && this.select(this.sets, value)
			this.toggle()
		}
	},
	computed: {
		filteredList() {
			return this.$props.options?.filter((opt) => opt.toString().toLowerCase().includes(this.search.toLowerCase()))
		},
		disabled() {
			return this.controledBy && !this.$store.state.selected[this.controledBy]
		}
	}
})
</script>
