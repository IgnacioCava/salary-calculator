import data from './data.json'
import db from '.'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { SalaryData, Sections } from './types'

const percentage = (totalValue: string, percentage: string) => {
	return Math.floor((parseInt(percentage) / 100) * parseInt(totalValue.replaceAll(',', '')))
}

const OTE = (base: string, target: number) => {
	return parseInt(base.replaceAll(',', '')) - target
}

const setup = async () => {
	const mappedData: Sections = {}

	const initialized = (await getDoc(doc(db, 'departments/initialized'))).data()?.initialized
	if (!initialized) {
		data.map(({ department: dept, jobRole: job, level, minSalary, maxSalary, midSalary, basePayPercentage }) => {
			const minBase = percentage(minSalary, basePayPercentage)
			const midBase = percentage(midSalary, basePayPercentage)
			const maxBase = percentage(maxSalary, basePayPercentage)
			const baseData = {
				level,
				minSalary,
				maxSalary,
				midSalary,
				basePayPercentage,
				calculated: {
					min: { base: minBase, OTE: OTE(minSalary, minBase) },
					mid: { base: midBase, OTE: OTE(midSalary, midBase) },
					max: { base: maxBase, OTE: OTE(maxSalary, maxBase) }
				}
			}
			if (mappedData[dept]) {
				if (mappedData[dept][job]) mappedData[dept][job] = [...mappedData[dept][job], baseData]
				else mappedData[dept] = { ...mappedData[dept], [job]: [baseData] }
			} else mappedData[dept] = { [job]: [baseData] }
		})

		try {
			await setDoc(doc(db, 'departments', 'list'), { ...Object.keys(mappedData) })
			Object.entries(mappedData).forEach(async ([department, role]) => {
				await setDoc(doc(db, 'departments', department), { ...role })
			})
			await setDoc(doc(db, 'departments', 'initialized'), { initialized: true })
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}
	const departments = Object.values((await getDoc(doc(db, 'departments/list'))).data() as string[])
	const jobs = await Promise.all(
		departments.map(async (dept) => {
			const jobs = (await getDoc(doc(db, `departments/${dept}`))).data()
			const jobsData = Object.entries(jobs as Record<PropertyKey, SalaryData[]>).map(([title, salaryData]) => {
				const levels = salaryData.map((e) => e.level)
				return { title, levels, salaryData }
			})

			return { department: dept, jobs: jobsData }
		})
	)
	return jobs
}

export default setup
