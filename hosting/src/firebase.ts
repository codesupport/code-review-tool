import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export const app = initializeApp({
	apiKey: "AIzaSyBZh6KFSTk8Ue33Lve7CETgJU9JpTfBAJg",
	authDomain: "codesupport.dev",
	databaseURL: "https://codesupport-production.firebaseio.com",
	projectId: "codesupport-production",
	storageBucket: "codesupport-production.appspot.com",
	messagingSenderId: "300111604570",
	appId: "1:300111604570:web:39ae8baff812ed26fe2163",
	measurementId: "G-PRJWCPYV56"
});

const emulatorDetails = {
	authURL: process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_URL,
	firestoreHost: process.env.REACT_APP_FIREBASE_FIRESTORE_EMULATOR_HOST,
	firestorePort: process.env.REACT_APP_FIREBASE_FIRESTORE_EMULATOR_PORT
};

if (process.env.REACT_APP_ENV !== "production") {
	connectAuthEmulator(getAuth(), emulatorDetails.authURL!);
	connectFirestoreEmulator(getFirestore(), emulatorDetails.firestoreHost!, +emulatorDetails.firestorePort!);
} else {
	initializeAppCheck(app, {
		provider: new ReCaptchaV3Provider("6LenhPoZAAAAAIE_6OQ4Aj6FwFd531NcLxh_a386"),
		isTokenAutoRefreshEnabled: true
	});
}
