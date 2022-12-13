import data from './data.json'
import db from '.'
import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	doc,
	setDoc
} from 'firebase/firestore'

interface SalaryData {
	level: number
	minSalary: string
	maxSalary: string
	basePayPercentage: string
}

interface Sections {
	[key: string]: {
		[key: string]: SalaryData[]
	}
}

const setup = async () => {
	const mappedData: Sections = {}

	const initialized = (
		await getDoc(doc(db, 'departments/initialized'))
	).data()?.initialized
	if (!initialized) {
		data.map(
			({
				department: dept,
				jobRole: job,
				level,
				minSalary,
				maxSalary,
				basePayPercentage
			}) => {
				const baseData = {
					level,
					minSalary,
					maxSalary,
					basePayPercentage
				}
				if (mappedData[dept]) {
					if (mappedData[dept][job])
						mappedData[dept][job] = [
							...mappedData[dept][job],
							baseData
						]
					else
						mappedData[dept] = {
							...mappedData[dept],
							[job]: [baseData]
						}
				} else mappedData[dept] = { [job]: [baseData] }
			}
		)

		try {
			Object.entries(mappedData).forEach(async ([department, role]) => {
				await setDoc(doc(db, 'departments', department), { ...role })
			})
			await setDoc(doc(db, 'departments', 'initialized'), {
				initialized: true
			})
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	} else {
		console.log('Done')
	}
}

export default setup
