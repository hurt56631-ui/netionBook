// themes/heo/components/Header.js (修改版)

import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import DarkModeButton from './DarkModeButton' // 如果需要，可以重新加回来
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
// import ReadingProgress from './ReadingProgress' // 已移除
import SearchButton from './SearchButton' // 如果需要，可以重新加回来
import SlideOver from './SlideOver'
import LazyImage from '@/components/LazyImage' // 导入 LazyImage 组件

/**
 * 页头：顶部导航 (已修改，取消浮动)
 * @param {*} param0
 * @returns
 */
const Header = props => {
  // fixedNav 状态不再用于控制导航栏的固定定位
  const [fixedNav, setFixedNav] = useState(false) // 保持声明，但其值可能不再影响 'fixed' 样式
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
   * fixedNav 将不再设为 true，从而取消顶部导航的固定浮动
   */
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      if (scrollS <= 1) { // 滚动到顶部时
        setFixedNav(false) // 始终为 false
        setBgWhite(false)
        setTextWhite(false)
        if (document?.querySelector('#post-bg')) {
          // setFixedNav(true) // **移除或注释此行，不再固定**
          setTextWhite(true) // 保持文字白色
        }
      } else { // 滚动离开顶部时
        setFixedNav(false) // **始终为 false，取消固定**
        setTextWhite(false)
        setBgWhite(true) // 仍然可以在滚动时改变背景颜色和阴影
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
    { title: 'telegar', url: 'https://t.me/+PVH4J-Mz5i81YzFl', icon: 'fa-brands fa-telegram', img: '' }
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

      {/* fixed时留白高度 - 由于我们取消了 fixedNav，这行将不再渲染 */}
      {/* {fixedNav && !document?.querySelector('#post-bg') && (
        <div className='h-16'></div>
      )} */}

      {/* 顶部导航菜单栏 */}
      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full duration-300 transition-all
            relative bg-transparent // **直接设为 relative，不再依赖 fixedNav**
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

          {/* --- 右侧固定 --- */}
          <div className='flex flex-shrink-0 justify-end items-center space-x-1'>
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
                {button.icon && <i className={button.icon} />}
                {button.img && <LazyImage src={button.img} alt={button.title} className="w-6 h-6 object-contain" />}
              </a>
            ))}

            {/* DarkModeButton, SearchButton 可以根据需要重新添加 */}
            {/* <DarkModeButton /> */}
            {/* <SearchButton /> */}

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
