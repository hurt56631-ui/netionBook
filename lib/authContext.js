// lib/authContext.js (基于 Firebase Auth 的最终版本)

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './firebase'; // 导入我们之前创建的 Firebase auth 实例

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged 是 Firebase 的一个监听器
    // 它会在用户的登录状态发生变化时自动触发
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 用户已登录
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        // 用户已登出
        setUser(null);
      }
      setLoading(false);
    });

    // 在组件卸载时，取消监听
    return () => unsubscribe();
  }, []);

  // 社交登录函数
  const signInWithProvider = async (providerName) => {
    let provider;
    switch (providerName) {
      case 'google':
        provider = new GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new FacebookAuthProvider();
        break;
      case 'github':
        provider = new GithubAuthProvider();
        break;
      // 可以添加其他提供商
      default:
        throw new Error(`Unsupported provider: ${providerName}`);
    }
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(`Error signing in with ${providerName}`, error);
      alert(`登录失败: ${error.message}`); // 用户友好的提示
    }
  };

  // 登出函数
  const logOut = async () => {
    setLoading(true); // 登出时显示加载状态
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out from Firebase.');
    } catch (error) {
      console.error("Error signing out from Firebase", error);
      alert(`登出失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithProvider, // 统一的社交登录入口
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
