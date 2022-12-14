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
	getters: {
		status(state) {
			if (state.loading) return 'loading'
			if (state.success) return 'success'
			if (state.error) return 'error'
		}
	},
	mutations: {
		setData(state, payload) {
			state.loading = false
			if (payload instanceof Error) {
				return (state.error = true)
			}
			state.departments = payload?.map((e: any) => e.department)
			state.cache = payload
			state.success = true
		},
		setSelected(state, payload: { type: keyof typeof state.selected; value: string }) {
			state.selected[payload.type] = payload.value
			switch (payload.type) {
				case 'department': {
					const jobs = state.cache.find((e) => e.department === payload.value)?.jobs
					state.jobs = jobs?.map((job) => job.title) || []
					state.selected = { ...state.selected, job: '', level: '' }
					state.found = { jobsData: jobs || [], salaries: [], result: {} }
					if (jobs?.length === 1) {
						const job = jobs[0]
						state.selected.job = job.title
						state.found.salaries = job.salaryData
						state.levels = job.levels
						if (job.levels.length === 1) {
							state.selected.level = job.levels[0].toString()
							state.found.result = job.salaryData[0]
						}
					}
					break
				}
				case 'job': {
					const jobsData = state.found.jobsData.find((job) => job.title === payload.value)
					state.levels = jobsData?.levels || []
					state.selected = { ...state.selected, level: '' }
					state.found = { ...state.found, salaries: jobsData?.salaryData || [], result: {} }
					break
				}
				case 'level':
					state.found.result = state.found.salaries.find((salary) => salary.level.toString() === state.selected.level) || {}
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
