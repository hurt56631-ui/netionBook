// themes/heo/index.js (最终修复版，所有功能按钮都在)

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import CategoryBar from './components/CategoryBar'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestPostsGroup from './components/LatestPostsGroup'
import { NoticeBar } from './components/NoticeBar'
import PostAdjacent from './components/PostAdjacent'
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, slotTop, className, post } = props
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()
  
  const isIndex = router.pathname === '/'
  const isSlugPage = post && post.slug 

  const headerSlot = (
    <header>
      <Header {...props} />
      {isIndex ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
      {isSlugPage && !fullWidth ? <PostHeader {...props} isDarkMode={isDarkMode} /> : null}
    </header>
  )

  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]'

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />
      {headerSlot}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        <div
          id='container-inner'
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          <div className={`w-full h-auto ${className || ''}`}>
            {slotTop}
            {children}
          </div>
          <div className='lg:px-2'></div>
          <div className='hidden xl:block'>
            {slotRight}
          </div>
        </div>
      </main>
      <Footer />
      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 新增的功能按钮组件 (单个按钮样式)
 * @param {object} props - title, icon, url
 * @returns {JSX.Element}
 */
const FunctionButton = ({ title, icon, url }) => {
    return (
        <SmartLink href={url} className='group flex flex-col justify-center items-center w-full h-24 bg-white dark:bg-[#1e1e1e] border dark:border-gray-700 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200'>
            <div className='text-3xl text-gray-500 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-yellow-500 transition-colors duration-200'>
                <i className={icon} />
            </div>
            <div className='mt-2 text-sm text-gray-700 dark:text-gray-200'>{title}</div>
        </SmartLink>
    )
}

/**
 * 学习工具功能区 (恢复)
 * @returns {JSX.Element}
 */
const StudyToolsGrid = () => { // 更名为 StudyToolsGrid
    const functions = [
        { title: '字典', icon: 'fa-solid fa-book', url: 'https://chinese-ekjdgi3fx-843075195qqcoms-projects.vercel.app/article/256c928a-2fa6-80d2-bd93-d1be847c3c73' },
        { title: '语法', icon: 'fa-solid fa-pen-ruler', url: '/grammar-page' },
        { title: '练习题', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
        { title: '书籍', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
        { title: '工具', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
        { title: '资料', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
    ]

    return (
        <div className='py-8'>
            <div className='text-2xl font-bold mb-4 text-center dark:text-white'>学习工具</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {functions.map(func => <FunctionButton key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 快捷入口功能区 (恢复)
 * @returns {JSX.Element}
 */
const QuickAccessGrid = () => {
    const functions = [
        { title: '加入VIP', icon: 'fa-solid fa-crown', url: '/vip-page' },
        { title: '找工作', icon: 'fa-solid fa-briefcase', url: '/jobs-page' },
        { title: '加入频道', icon: 'fa-solid fa-users', url: 'https://www.facebook.com/share/16fpFsbhh2/' },
    ]

    return (
        <div className='py-8'>
            <div className='text-2xl font-bold mb-4 text-center dark:text-white'>快捷入口</div>
            <div className='grid grid-cols-3 gap-4'> {/* 强制三列 */}
                {functions.map(func => <FunctionButton key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      <CategoryBar {...props} />
      
      {/* --- 在文章列表上方添加学习工具区 --- */}
      <StudyToolsGrid />
      {/* --- 学习工具区结束 --- */}

      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      {/* --- 在文章列表下方添加快捷入口区 --- */}
      <QuickAccessGrid />
      {/* --- 快捷入口区结束 --- */}
    </div>
  )
}

// ... (所有其他布局组件的代码保持不变，并确保它们完整) ...
// 保持所有 Layout 组件和 CONFIG 导出不变

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
