import fb from "firebase/app"
import { FirebaseConfig } from "./firebase.config";

const firebaseApp = !fb.apps.length ? fb.initializeApp(FirebaseConfig) : fb.app();

export default firebaseApp;