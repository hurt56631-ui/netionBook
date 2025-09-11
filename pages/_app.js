// pages/_app.js (最终修正版 - 彻底移除 Clerk，并引入 Firebase AuthProvider)

import '@/styles/globals.css'
import '@/styles/utility-patterns.css'
import '@/styles/notion.css'
import 'react-notion-x/src/styles.css'
import useAdjustStyle from '@/hooks/useAdjustStyle'
import { AuthProvider } from '@/lib/authContext' // <-- 确保这里正确导入
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'
import BLOG from '@/blog.config'
import ExternalPlugins from '@/components/ExternalPlugins'
import SEO from '@/components/SEO'

// --- 删除所有 Clerk 相关的导入 ---
// import { zhCN } from '@clerk/localizations' // <-- 确认已删除
// import dynamic from 'next/dynamic' // <-- 确认已删除

import { GlobalStyle } from '@/components/GlobalStyle'
import SplashScreen from '@/components/SplashScreen'

// --- 删除 ClerkProvider 的定义 ---
// const ClerkProvider = dynamic(() => // <-- 确认已删除
//   import('@clerk/nextjs').then(m => m.ClerkProvider) // <-- 确认已删除
// ) // <-- 确认已删除


const MyApp = ({ Component, pageProps }) => {
  useAdjustStyle()
  const route = useRouter()
  const theme = useMemo(() => {
    return (
      getQueryParam(route.asPath, 'theme') ||
      pageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME
    )
  }, [route])

  const GLayout = useCallback(
    props => {
      const Layout = getBaseLayoutByTheme(theme)
      return <Layout {...props} />
    },
    [theme]
  )

  // --- 删除 enableClerk 变量和其判断逻辑 ---
  // const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY // <-- 确认已删除
  const content = (
    <GlobalContextProvider {...pageProps}>
      <GLayout {...pageProps}>
        <SEO {...pageProps} />
        <Component {...pageProps} />
        <GlobalStyle />
      </GLayout>
      <ExternalPlugins {...pageProps} />
    </GlobalContextProvider>
  )
  return (
    <>
      <SplashScreen />
      {/* --- 确保这里是 AuthProvider 包裹 content，并且没有 Clerk 的条件渲染 --- */}
      <AuthProvider> 
        {content}
      </AuthProvider>
    </>
  )
}

export default MyApp
