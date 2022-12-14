import data from './data.json'
import db from '.'
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'
import { SalaryData, Sections } from './types'
import { percentage, OTE, findDoc } from './helpers'

const setup = async () => {
	const mappedData: Sections = {}

	const docs = (await getDocs(collection(db, 'departments'))).docs.map((e) => ({ id: e.id, data: e.data() }))

	const initialized = findDoc(docs, 'initialized')?.initialized === true

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
			return e
		}
	}
	const departments = Object.values(findDoc(docs, 'list') as string[])
	const jobs = await Promise.all(
		departments?.map(async (dept) => {
			const jobs = findDoc(docs, dept)
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
