import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import ReadingProgress from './ReadingProgress'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'
import LazyImage from '@/components/LazyImage' // 导入 LazyImage 组件

/**
 * 页头：顶部导航 (已精简)
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [textWhite, setTextWhite] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const router = useRouter()
  const slideOverRef = useRef()

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  /**
   * 根据滚动条，切换导航栏样式
   */
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      if (scrollS <= 1) {
        setFixedNav(false)
        setBgWhite(false)
        setTextWhite(false)
        if (document?.querySelector('#post-bg')) {
          setFixedNav(true)
          setTextWhite(true)
        }
      } else {
        setFixedNav(true)
        setTextWhite(false)
        setBgWhite(true)
      }
    }, 100)
  )
  useEffect(() => {
    scrollTrigger()
  }, [router])

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  useEffect(() => {
    let prevScrollY = 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY > prevScrollY) {
            setActiveIndex(1)
          } else {
            setActiveIndex(0)
          }
          prevScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // --- 在这里定义您的社交媒体按钮信息 ---
  const socialButtons = [
    { title: 'Facebook', url: 'https://www.facebook.com/share/16fpFsbhh2/', icon: 'fa-brands fa-facebook', img: '' },
    { title: 'TikTok', url: 'https://vt.tiktok.com/ZSHGDjda1hkwq-Pz4h9/', icon: 'fa-brands fa-tiktok', img: '' },
    { title: 'YouTube', url: 'https://www.youtube.com/YOUR_CHANNEL', icon: 'fa-brands fa-youtube', img: '' },
    // 微信使用图片图标
    { title: 'telegar', url: '/images/wechat-qr-code.jpg', icon: '', img: '/images/wechat-icon.png' } // <-- 假设您有微信图标和二维码
  ];
  // --- 定义结束 ---


  return (
    <>
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0.5;
            transform: translateY(-30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0.5;
            transform: translateY(30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-down {
          animation: fade-in-down 0.3s ease-in-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.3s ease-in-out;
        }
      `}</style>

      {/* fixed时留白高度 */}
      {fixedNav && !document?.querySelector('#post-bg') && (
        <div className='h-16'></div>
      )}

      {/* 顶部导航菜单栏 */}
      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full duration-300 transition-all
            ${fixedNav ? 'fixed' : 'relative bg-transparent'} 
            ${textWhite ? 'text-white ' : 'text-black dark:text-white'}  
            ${navBgWhite ? 'bg-white dark:bg-[#18171d] shadow' : 'bg-transparent'}`}>
        <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-6'>
          {/* 左侧logo */}
          <Logo {...props} />

          {/* 中间菜单 */}
          <div
            id='nav-bar-swipe'
            className={`hidden lg:flex flex-grow flex-col items-center justify-center h-full relative w-full`}>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 0 ? 'opacity-100 mt-0' : '-mt-20 opacity-0 invisible'}`}>
              <MenuListTop {...props} />
            </div>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 1 ? 'opacity-100 mb-0' : '-mb-20 opacity-0 invisible'}`}>
              <h1 className='font-bold text-center text-light-400 dark:text-gray-400'>
                {siteConfig('AUTHOR') || siteConfig('TITLE')}{' '}
                {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
              </h1>
            </div>
          </div>

          {/* --- 右侧固定 (已修改) --- */}
          <div className='flex flex-shrink-0 justify-end items-center space-x-1'> {/* 将 space-x-2 改为 space-x-1，减小间距 */}
            {/* 循环渲染社交按钮 */}
            {socialButtons.map(button => (
              <a
                key={button.title}
                href={button.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={button.title}
                className='p-2 cursor-pointer text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-9 h-9 flex items-center justify-center'
                title={button.title}
              >
                {button.icon && <i className={button.icon} />} {/* 如果有 icon 则显示 icon */}
                {button.img && <LazyImage src={button.img} alt={button.title} className="w-6 h-6 object-contain" />} {/* 如果有 img 则显示图片 */}
              </a>
            ))}

            {/* SearchButton 和 ReadingProgress 已被移除 */}
            {/* 移动端菜单按钮 */}
            <div
              onClick={toggleMenuOpen}
              className='flex lg:hidden w-8 justify-center items-center h-8 cursor-pointer'>
              <i className='fas fa-bars' />
            </div>
          </div>
          {/* --- 修改结束 --- */}

          {/* 右边侧拉抽屉 */}
          <SlideOver cRef={slideOverRef} {...props} />
        </div>
      </nav>
    </>
  )
}

export default Header
