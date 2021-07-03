import fb from "firebase/app"
import { FirebaseConfig } from "./firebase.config";

export const firebase = !fb.apps.length ? fb.initializeApp(FirebaseConfig) : fb.app()