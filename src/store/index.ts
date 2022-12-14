import { createStore } from 'vuex'
import { AppState } from './types'

export default createStore({
	state: {
		departments: [],
		jobs: [],
		levels: [],
		selected: {
			department: '',
			job: '',
			level: ''
		},
		found: {
			jobsData: [],
			salaries: [],
			result: {}
		},
		cache: [],
		loading: true,
		success: false,
		error: false
	} as AppState,
	getters: {},
	mutations: {
		setData(state, payload) {
			state.departments = payload?.map((e: any) => e.department)
			state.cache = payload
		},
		setSelected(state, payload: { type: keyof typeof state.selected; value: string }) {
			state.selected[payload.type] = payload.value
			switch (payload.type) {
				case 'department': {
					const jobs = state.cache.find((e: any) => e.department === payload.value)?.jobs
					state.jobs = jobs?.map((e: any) => e.title) || []
					state.selected = { ...state.selected, job: '', level: '' }
					state.found = { jobsData: jobs || [], salaries: [], result: {} }
					break
				}
				case 'job': {
					const jobsData = state.found.jobsData.find((e: any) => e.title === payload.value)
					state.levels = jobsData?.levels || []
					state.selected = { ...state.selected, level: '' }
					state.found = { ...state.found, salaries: jobsData?.salaryData || [], result: {} }
					break
				}
				case 'level':
					state.found.result = state.found.salaries.find((e: any) => e.level === state.selected.level) || {}
					break

				default:
					break
			}
		},
		clear(state) {
			state.jobs = []
			state.levels = []
			state.selected = { department: '', job: '', level: '' }
			state.found = { jobsData: [], salaries: [], result: {} }
		}
	},
	actions: {},
	modules: {}
})
