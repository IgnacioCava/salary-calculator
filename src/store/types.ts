import { SalaryData } from '@/firebase/types'

export interface AppState {
	departments: string[]
	jobs: string[]
	levels: number[]
	selected: {
		department: string
		job: string
		level: string
	}
	found: {
		jobsData: Job[]
		salaries: SalaryData[]
		result: SalaryData | Record<string, never>
	}
	cache: JobsData[]
	loading: boolean
	success: boolean
	error: boolean
}

interface JobsData {
	department: string
	jobs: Job[]
}

interface Job {
	title: string
	levels: number[]
	salaryData: SalaryData[]
}
