// themes/heo/components/BottomNav.js (最终修改版 - 平板和手机均显示底部导航)

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AIChatDrawer from './AIChatDrawer' // 导入我们创建的 Drawer 组件

const BottomNav = () => {
  const router = useRouter()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  // 导航项定义
  const navItems = [
    { name: '主页', path: '/', icon: 'fas fa-home', isLink: true },
    { name: 'AI助手', path: '#ai-chat', icon: 'fas fa-robot', isLink: false }, // isLink: false 表示这是一个触发器
    { name: '论坛', path: '/forum', icon: 'fas fa-comments', isLink: true },
    { name: '找工作', path: '/jobs', icon: 'fas fa-briefcase', isLink: true },
    { name: '书柜', path: 'https://books.843075.xyz', icon: 'fas fa-book', isLink: true },
  ]

  // Drawer 打开/关闭处理
  const handleOpenDrawer = () => {
    // 使用 shallow routing 在不重新加载页面的情况下更改 URL
    router.push(router.pathname + '#ai-chat', undefined, { shallow: true })
    setDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    // 如果 URL 中还有 hash，则返回上一页（移除 hash）
    if (window.location.hash === '#ai-chat') {
      router.back()
    }
    setDrawerOpen(false)
  }
  
  // 监听 URL hash 的变化来处理手势返回
  useEffect(() => {
    const handleHashChange = () => {
      // 如果 hash 不再是 #ai-chat，并且抽屉是打开的，就关闭它
      if (window.location.hash !== '#ai-chat' && isDrawerOpen) {
        setDrawerOpen(false)
      }
    }
    
    // popstate 事件也能捕获浏览器的前进/后退操作
    window.addEventListener('popstate', handleHashChange)
    
    return () => {
      window.removeEventListener('popstate', handleHashChange)
    }
  }, [isDrawerOpen])


  return (
    <>
      <style jsx global>{`
        /* 针对所有屏幕尺寸小于等于 lg (即手机和平板) 为 body 底部留出空间 */
        @media (max-width: 1023px) { /* lg 断点是 1024px，所以 max-width: 1023px 表示小于 lg */
          body {
            padding-bottom: 70px; /* 底部导航栏高度 + 一点间距 */
          }
        }
        /* 如果在 lg 及以上屏幕不显示底部导航栏，则不需要 padding-bottom */
        @media (min-width: 1024px) { /* lg 尺寸及以上 */
          body {
            padding-bottom: 0px !important; /* 强制移除留白，避免影响桌面布局 */
          }
        }
      `}</style>

      {/* 将 md:hidden 改为 lg:hidden，表示在 lg 及以上屏幕尺寸才隐藏 */}
      <div id='bottom-nav' className='fixed bottom-0 left-0 w-full bg-white dark:bg-[#18171d] shadow-lg
                                     flex justify-around items-center h-16 z-40 border-t border-gray-100 dark:border-gray-800
                                     lg:hidden'> {/* <-- 从 md:hidden 改为 lg:hidden */}
        {navItems.map(item => {
          // 如果是普通的链接
          if (item.isLink) {
            return (
              <Link href={item.path} key={item.name} className={`flex flex-col items-center justify-center flex-1
                                                                px-2 py-1 transition-colors duration-200
                                                                ${router.pathname === item.path ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'}`}>
                <i className={`${item.icon} text-xl mb-1`}></i>
                <span className='text-xs'>{item.name}</span>
              </Link>
            )
          }
          // 如果是 AI 助手按钮
          return (
            <button key={item.name} onClick={handleOpenDrawer} className='flex flex-col items-center justify-center flex-1
                                                                          px-2 py-1 transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'>
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className='text-xs'>{item.name}</span>
            </button>
          )
        })}
      </div>

      {/* AI 聊天抽屉组件 */}
      <AIChatDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </>
  )
}

export default BottomNav
