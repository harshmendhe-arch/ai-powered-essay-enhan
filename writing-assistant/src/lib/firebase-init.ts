import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig, validateFirebaseConfig } from "@/config/firebase.config";

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;

function initializeFirebase(): boolean {
  if (!validateFirebaseConfig()) {
    return false;
  }

  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    return true;
  } catch {
    return false;
  }
}

const initialized = initializeFirebase();

export function isFirebaseInitialized(): boolean {
  return initialized;
}

// Provide a stable auth reference. Callers must check isFirebaseInitialized()
// before using auth, as it will be null when Firebase is not configured.
export const auth: Auth | null = authInstance;
