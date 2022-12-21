import data from '@/firebase/data.json'
import db from '@/firebase'
import { collection, addDoc, getCountFromServer, DocumentData, setDoc, doc } from 'firebase/firestore'

const appCollection = collection(db, 'departments')
const deptList = doc(db, 'departments', 'departmentList')

const setup = async () => {
	const docsReady = (await getCountFromServer(appCollection))?.data().count
	if (!docsReady) {
		const list: string[] = []
		data.forEach((set) => {
			addDoc(appCollection, set)
			if (!list.includes(set.department)) list.push(set.department)
		})
		setDoc(deptList, { ...list })
	}
}

const percentage = (totalValue: string, percentage: string) => {
	return Math.round((parseInt(percentage) / 100) * parseInt(totalValue.replaceAll(',', '')))
}

const OTE = (base: string, target: number) => {
	return parseInt(base.replaceAll(',', '')) - target
}

const formatNumber = (number: number) => {
	return number.toLocaleString().replace('.', ',')
}

const findDoc = (docs: { id: string; data: DocumentData }[], id: string) => {
	return docs.find((doc) => doc.id === id)?.data
}

export { percentage, OTE, findDoc, setup, formatNumber, appCollection, deptList }
