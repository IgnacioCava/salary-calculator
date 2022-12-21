import { getDocs, query, where, getDoc, orderBy } from 'firebase/firestore'
import { createStore } from 'vuex'
import { AppState } from './types'
import { setup, appCollection, deptList } from './helpers'

export default createStore({
	state: {
		departments: [],
		jobs: [],
		levels: [],
		selected: {
			department: '',
			job: '',
			level: null
		},
		cache: [],
		result: null,
		status: 'loading'
	} as AppState,
	getters: {
		status(state) {
			return state.status
		},
		departments(state) {
			return state.departments
		},
		jobs(state) {
			return state.jobs
		},
		levels(state) {
			return state.levels
		},
		selected(state) {
			return state.selected
		},
		result(state) {
			return state.result
		}
	},
	mutations: {
		setStatus(state, status: AppState['status']) {
			state.status = status
		},
		setDepartments(state, deparments: AppState['departments']) {
			state.departments = deparments
		},
		setJobs(state, jobs: AppState['jobs']) {
			state.jobs = jobs
		},
		setLevels(state, levels: AppState['levels']) {
			state.levels = levels
		},
		setSelected(state, [property, value]: [keyof AppState['selected'], string | number]) {
			if (property === 'level') state.selected[property] = value as number
			else state.selected[property] = value as string
		},
		setResult(state, result: AppState['result']) {
			state.result = result
		},
		setCachedResults(state, results: AppState['cache']) {
			state.cache = results
		},
		clear(state) {
			state.jobs = []
			state.levels = []
			state.selected = { department: '', job: '', level: null }
			state.cache = []
			state.result = null
		},
		clearFields(state, fields: string[]) {
			state.result = null
			if (fields.includes('job')) {
				state.jobs = []
				state.levels = []
			}
			if (fields.includes('level')) state.levels = []
			const selected = {
				...state.selected,
				job: fields.includes('job') ? '' : state.selected.job,
				level: fields.includes('level') ? null : state.selected.level
			}
			state.selected = selected
		}
	},
	actions: {
		async initializeStore({ dispatch }) {
			await setup()
			const departments = (await getDoc(deptList))?.data()
			if (departments) dispatch('fetchDepartments', Object.values(departments))
			dispatch('setStatus', 'success')
		},

		async fetchDepartments({ commit }, list?: AppState['departments']) {
			commit('clearFields', ['job', 'level'])
			if (list) return commit('setDepartments', list)
			const departments = (await getDoc(deptList))?.data()
			if (departments) commit('setDepartments', Object.values(departments))
		},

		async fetchJobs({ commit, state }, department: AppState['selected']['department']) {
			if (department !== state.selected.department) commit('clearFields', ['job', 'level'])
			commit('setSelected', ['department', department])
			const q = query(appCollection, where('department', '==', department))
			const jobs = (await getDocs(q))?.docs.map((doc) => doc.data())
			if (jobs) {
				const jobRoles = jobs.map((doc) => doc.jobRole)
				const roles = [...new Set(jobRoles)]
				if (roles.length === 1) this.dispatch('fetchLevels', jobRoles[0])
				commit('setJobs', roles)
			}
		},

		async fetchLevels({ commit, state }, job: AppState['selected']['job']) {
			if (job !== state.selected.job) commit('clearFields', ['level'])
			commit('setSelected', ['job', job])
			const q = query(appCollection, where('department', '==', state.selected.department), where('jobRole', '==', job), orderBy('level'))
			const results = (await getDocs(q))?.docs.map((docs) => docs.data())
			const levels = results.map((docs) => docs.level)
			if (results) {
				commit('setLevels', levels)
				commit('setCachedResults', results)
				if (results.length === 1) {
					this.dispatch('fetchResult', levels[0])
				}
			}
		},

		async fetchResult({ commit, state }, level: AppState['selected']['level']) {
			commit('setSelected', ['level', level])
			// const q = query(appCollection, where("department", "==", state.selected.department), where("jobRole", "==", state.selected.job), where("level", "==", level))
			// const result = (await getDocs(q)).docs.map(docs => docs.data())?.[0]
			const result = state.cache.find((job) => job.level === level)
			if (result) commit('setResult', result)
		},
		setStatus({ commit }, status) {
			commit('setStatus', status)
		},
		clearFields({ commit }) {
			commit('clear')
		}
	},
	modules: {}
})
