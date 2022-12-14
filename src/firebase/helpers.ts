import { DocumentData } from 'firebase/firestore'

const percentage = (totalValue: string, percentage: string) => {
	return Math.round((parseInt(percentage) / 100) * parseInt(totalValue.replaceAll(',', '')))
}

const OTE = (base: string, target: number) => {
	return parseInt(base.replaceAll(',', '')) - target
}

const findDoc = (docs: { id: string; data: DocumentData }[], id: string) => {
	return docs.find((doc) => doc.id === id)?.data
}

export { percentage, OTE, findDoc }
