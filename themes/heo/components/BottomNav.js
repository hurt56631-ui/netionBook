// themes/heo/components/BottomNav.js

import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const BottomNav = () => {
  const router = useRouter()
  const currentPath = router.pathname

  const navItems = [
    { name: '主页', path: '/', icon: 'fas fa-home' },
    { name: 'AI助手', path: '/ai-assistant', icon: 'fas fa-robot' },
    { name: '论坛', path: '/forum', icon: 'fas fa-comments' },
    { name: '找工作', path: '/jobs', icon: 'fas fa-briefcase' },
    { name: '书柜', path: '/bookshelf', icon: 'fas fa-book' },
  ]

  return (
    <>
      <style jsx global>{`
        /* 针对所有页面，在小屏幕上为 body 底部留出空间 */
        @media (max-width: 767px) {
          body {
            padding-bottom: 70px; /* 底部导航栏高度 + 一点间距 */
          }
        }
      `}</style>

      <div id='bottom-nav' className='fixed bottom-0 left-0 w-full bg-white dark:bg-[#18171d] shadow-lg
                                     flex justify-around items-center h-16 z-50 border-t border-gray-100 dark:border-gray-800
                                     md:hidden'> {/* md:hidden 表示在 medium 及以上屏幕隐藏 */}
        {navItems.map(item => (
          <Link href={item.path} key={item.name} className={`flex flex-col items-center justify-center
                                                            px-2 py-1 transition-colors duration-200
                                                            ${currentPath === item.path ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'}`}>
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className='text-xs'>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default BottomNav
