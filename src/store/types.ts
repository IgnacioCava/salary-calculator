export interface AppState {
	departments: string[]
	jobs: string[]
	levels: number[]
	selected: {
		department: string
		job: string
		level: number | null
	}
	cache: Result[] | []
	result: Result | null
	status: 'loading' | 'success' | 'error'
}

interface Result {
	basePayPercentage: string
	minSalary: string
	midSalary: string
	maxSalary: string
	department: string
	jobRole: string
	level: number
}
