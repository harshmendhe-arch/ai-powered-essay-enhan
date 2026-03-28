// Firebase configuration
// Replace these values with your actual Firebase project credentials
// Get these from your Firebase Console: https://console.firebase.google.com/

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "fish-seller-8638b.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fish-seller-8638b",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "fish-seller-8638b.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "360787787503",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase config
export function validateFirebaseConfig(): boolean {
  const requiredKeys = ["apiKey", "authDomain", "projectId", "storageBucket"];
  return requiredKeys.every((key) =>
    firebaseConfig[key as keyof typeof firebaseConfig]
  );
}
