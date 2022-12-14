import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const { VUE_APP_API_KEY: apiKey, VUE_APP_AUTH_DOMAIN: authDomain, VUE_APP_PROJECT_ID: projectId, VUE_APP_STORAGE_BUCKET: storageBucket, VUE_APP_MESSAGING_SENDER_ID: messagingSenderId, VUE_APP_APP_ID: appId } = process.env

const firebaseConfig = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()

export default db
