// lib/firebase.js (最终正确版本 - 包含 getAuth 并使用环境变量)

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // <-- !!! 这一行必须存在且不能注释掉 !!!
import { getFirestore } from 'firebase/firestore';

// 从环境变量中读取 Firebase 项目配置
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

const auth = getAuth(app); // <-- !!! 这一行必须存在且不能注释掉 !!!
const db = getFirestore(app);

export { app, auth, db }; // <-- !!! 确保导出了 auth !!!
