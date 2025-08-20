// themes/heo/index.js

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
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className, post } = props // <-- 确保接收 post

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()
  
  // 判断是否是首页
  const isIndex = router.pathname === '/'
  // 判断是否是文章详情页
  const isSlugPage = post && post.slug 

  const headerSlot = (
    <header>
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 通知横幅 */}
      {/* 只有在首页时，才渲染 Hero 组件 */}
      {isIndex ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
      
      {/* --- 关键修复：只有在文章详情页时，才渲染 PostHeader 组件 --- */}
      {isSlugPage && !fullWidth ? <PostHeader {...props} isDarkMode={isDarkMode} /> : null}
    </header>
  )

  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]'

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        <div
          id='container-inner'
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          <div className={`w-full h-auto ${className || ''}`}>
            {/* 主区上部嵌入 */}
            {slotTop}
            {children}
          </div>

          <div className='lg:px-2'></div>

          <div className='hidden xl:block'>
            {/* 主区快右侧 */}
            {slotRight}
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 新增的功能按钮组件
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
 * 新增的功能区组件
 * @returns {JSX.Element}
 */
const FunctionGrid = () => {
    const functions = [
        { title: '字典', icon: 'fa-solid fa-book', url: '/dictionary-page' },
        { title: '语法', icon: 'fa-solid fa-pen-ruler', url: '/grammar-page' },
        { title: '练习题', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
        // 您可以继续在这里添加更多功能按钮
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
 * 首页
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      {/* --- 在文章列表下方添加功能区 --- */}
      <FunctionGrid />
      {/* --- 功能区结束 --- */}
    </div>
  )
}

// ... (LayoutPostList, LayoutSearch, ... LayoutTagIndex 等组件保持不变) ...
// ... (所有布局组件的代码) ...

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
