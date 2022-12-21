<template>
	<div :class="[dynamicStyles.container, staticStyles.container]">
		<span :class="staticStyles.label">
			{{ label }}
		</span>
		<div @click.prevent="toggle" :class="[dynamicStyles.dropdownButton, staticStyles.dropdownButton]">
			<div :class="staticStyles.dropdownText">
				<font-awesome-icon :icon="`fa-solid ${icon}`" />
				<p :class="staticStyles.selectedLabel">{{ selected[type || ''] || label }}</p>
			</div>
			<img :src="chevron" class="h-full py-2" />
		</div>
		<div v-if="isOpen" :class="staticStyles.dropdown">
			<input type="text" v-model="search" placeholder="Search" :class="staticStyles.search" />
			<button v-for="opt in filteredList" @click.prevent="setData(opt)" :key="opt" :class="staticStyles.opt">
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
		type: String,
		icon: String
	},
	data() {
		return {
			search: '',
			isOpen: false,
			chevron,
			staticStyles: {
				container: 'text-left relative w-1/5',
				label: 'text-dropdown-label font-semibold text-sm',
				dropdownButton: 'flex box-border justify-between items-center border-solid border-2 w-full h-10 rounded-lg gap-2 px-3 py-1',
				dropdownText: 'flex row items-center gap-2 overflow-hidden',
				selectedLabel: 'text-sm text-ellipsis whitespace-nowrap w-full overflow-hidden',
				dropdown: 'flex flex-col shadow-[0_1px_6px_2px_rgba(0,0,0,0.15)] absolute top-full rounded-lg w-full mt-[2px] bg-white overflow-hidden',
				search: 'w-full outline-none appearance-none text-sm font-semibold bg-gray-150 p-2',
				opt: 'text-sm font-semibold text-dropdown-label w-100 text-left p-2'
			}
		}
	},
	setup(props) {
		const store = useStore()

		return {
			selected: computed(() => store.getters.selected),
			disabled: computed(() => props.controledBy && !store.getters.selected[props.controledBy])
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
			this.$emit('select', value)
			this.toggle()
		}
	},
	computed: {
		filteredList() {
			return this.options?.filter((opt) => opt.toString().toLowerCase().includes(this.search.toLowerCase()))
		},
		dynamicStyles() {
			return {
				container: {
					'pointer-events-none': this.disabled
				},
				dropdownButton: {
					[`border-dropdown-border-selected`]: this.isOpen,
					'hover:border-dropdown-border-selected cursor-pointer': !this.disabled,
					[`text-dropdown-${this.selected[this.type || ''] ? 'label' : 'selected-none'}`]: true,
					'font-bold': this.selected[this.type || '']
				},
				selectedLabel: {
					'text-dropdown-label': this.selected[this.controledBy || '']
				}
			}
		}
	}
})
</script>
