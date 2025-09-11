// pages/_app.js (最终修改版 - 移除 Clerk 并引入 Firebase AuthProvider)

import '@/styles/globals.css'
import '@/styles/utility-patterns.css'
import '@/styles/notion.css'
import 'react-notion-x/src/styles.css'
import useAdjustStyle from '@/hooks/useAdjustStyle'
// --- 导入 AuthProvider (来自 lib/authContext.js) ---
import { AuthProvider } from '@/lib/authContext' 
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'
import BLOG from '@/blog.config'
import ExternalPlugins from '@/components/ExternalPlugins'
import SEO from '@/components/SEO'

// --- 删除 Clerk 相关的导入 ---
// import { zhCN } from '@clerk/localizations'
// import dynamic from 'next/dynamic'

import { GlobalStyle } from '@/components/GlobalStyle'
import SplashScreen from '@/components/SplashScreen'

// --- 删除 ClerkProvider 的动态导入定义 ---
// const ClerkProvider = dynamic(() =>
//   import('@clerk/nextjs').then(m => m.ClerkProvider)
// )

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
  // const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 
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
      {/* --- 用 AuthProvider 包裹 content --- */}
      {/* {enableClerk ? ( // <-- 删除这行
        <ClerkProvider localization={zhCN}>{content}</ClerkProvider> // <-- 删除这行
      ) : ( // <-- 删除这行
        content // <-- 这行保留
      )} */}
      <AuthProvider> {/* <-- 添加 AuthProvider */}
        {content}
      </AuthProvider> {/* <-- 结束 AuthProvider */}
    </>
  )
}

export default MyApp
