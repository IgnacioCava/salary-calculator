export interface SalaryData {
	level: number
	minSalary: string
	midSalary: string
	maxSalary: string
	basePayPercentage: string
	calculated: {
		min: CalculatedSalary
		mid: CalculatedSalary
		max: CalculatedSalary
	}
}

interface CalculatedSalary {
	base: number
	OTE: number
}

export interface Sections {
	[key: string]: {
		[key: string]: SalaryData[]
	}
}
