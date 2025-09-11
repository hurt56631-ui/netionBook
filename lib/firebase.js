// lib/firebase.js (确认是这个版本，它会读取环境变量)

import { initializeApp, getApps, getApp } from 'firebase/app';
// 暂时只导入 getFirestore，因为认证由 Clerk 处理
// 如果后续需要使用 Firebase Auth 的 getAuth，可以再取消注释
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 暂时只获取 Firestore 实例，认证由 Clerk 处理
// 如果需要 Firebase Auth，取消注释下一行，并确保导入了 getAuth
// const auth = getAuth(app); 
const db = getFirestore(app);

// 暂时只导出 app 和 db
export { app, db };
