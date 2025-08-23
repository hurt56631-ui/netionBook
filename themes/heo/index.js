// themes/heo/index.js (修复版)

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

// --- 关键修复 1：导入 HomepagePriceInfo 组件 ---
import HomepagePriceInfo from './components/HomepagePriceInfo'

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

  const maxWidth = fullWidth ? 'max-w-[96rem]' : 'max-w-[86rem]'

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
 * 功能按钮
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
 * 学习工具功能区
 */
const StudyToolsGrid = () => {
    const functions = [
        { title: '字典', icon: 'fa-solid fa-book', url: '/words' },
        { title: '语法', icon: 'fa-solid fa-pen-ruler', url: '/grammar-page' },
        { title: '练习题', icon: 'fa-solid fa-file-pen', url: '/exercise-page' },
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
 * 快捷入口功能区
 */
const QuickAccessGrid = () => {
    const functions = [
        { title: '加入VIP', icon: 'fa-solid fa-crown', url: '/vip-page' },
        { title: '找工作', icon: 'fa-solid fa-briefcase', url: '/jobs-page' },
        { title: '加入频道', icon: 'fa-solid fa-users', url: 'https://www.facebook.com/share/16fpFsbhh2/' },
    ]

    return (
        <div className='py-8'>
            <div className='grid grid-cols-3 gap-4'>
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
      <HomepagePriceInfo />
      <CategoryBar {...props} />
      <QuickAccessGrid />
      <StudyToolsGrid />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

// ===================================================================
// --- 以下是为确保编译通过而恢复的、缺失的 Layout 组件定义 ---
// ===================================================================

/**
 * 文章详情页
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { fullWidth } = useGlobal()
  const router = useRouter()
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById('notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, 500)
    }
  }, [post])
  return (
    <>
      {post && !lock && (
        <div id="article-wrapper" className="px-5 md:px-0">
          <PostHeader {...props} />
          <div
            id="post-content"
            className={`w-full ${fullWidth ? '' : 'xl:max-w-5xl 2xl:max-w-6xl'} mx-auto lg:flex gap-10`}>

            {/* 主区 */}
            <div className='w-full'>
              <Transition
                show={true}
                appear={true}
                enter="transition ease-in-out duration-700"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <ArticleExpirationNotice post={post} />
                <div className='shadow md:px-10 pb-10 pt-5 bg-white dark:bg-[#1e1e1e]'>
                  <WWAds className='w-full' orientation='horizontal' />
                  <AISummary {...props} />
                  <NotionPage post={post} />
                  <PostCopyright {...props} />
                  <PostRecommend {...props} />
                  <WWAds className='w-full' orientation='horizontal' />
                  <AdSlot type='in-article' />
                </div>
                {/* 评论 */}
                <Comment frontMatter={post} />
              </Transition>
            </div>
          </div>
          {/* 上一篇下一篇文章 */}
          <PostAdjacent {...props} />
        </div>
      )}
      {lock && <PostLock validPassword={validPassword} />}
      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 搜索
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [router])

  return (
    <div className='px-5 md:px-0'>
      <SearchNav {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
    </div>
  )
}

/**
 * 归档
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return <div className='px-5 md:px-0'>
    <div className="pt-16 pb-10 text-center text-5xl font-extrabold text-black dark:text-white">
      <HashTag className='w-8 h-8 mx-auto' />归档
    </div>
    {Object.keys(archivePosts).map(archiveTitle => (
      <BlogPostArchive
        key={archiveTitle}
        posts={archivePosts[archiveTitle]}
        archiveTitle={archiveTitle}
      />
    ))}
  </div>
}

/**
 * 404
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      if (isBrowser) {
        const article = document.getElementById('notion-article')
        if (!article) {
          router.push('/').then(() => {
            // console.log('找不到页面', router.asPath)
          })
        }
      }
    }, 3000)
  }, [])

  return (
    <>
      <div className="text-black w-full h-screen text-center justify-center items-center flex flex-col">
        <div className="text-6xl font-sans">404</div>
        <div className="text-2xl">Notion page not found</div>
        <div className="text-sm">
          <LazyImage src={siteConfig('HEO_404_BACKGROUND')} className='w-full h-full object-cover' />
        </div>
      </div>
    </>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  return (
    <div className='px-5 md:px-0'>
      <div className="pt-16 pb-10 text-center text-5xl font-extrabold text-black dark:text-white">
        <HashTag className='w-8 h-8 mx-auto' />分类
      </div>
      <div id='category-list' className='w-full flex-wrap'>
        {categoryOptions?.map(category => {
          return (
            <SmartLink
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              className={' group'}>
              <div className='w-full h-40 flex justify-between items-center bg-white dark:bg-[#1e1e1e] border-2 my-4 rounded-lg px-10 relative overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-200'>
                <div className='text-2xl font-bold dark:text-white z-10'>{category.name}</div>
                <div className='text-3xl font-extralight text-gray-500 dark:text-gray-300 z-10'> {category.count} 篇</div>
                <div style={{ backgroundColor: category.color, opacity: 0.1 }} className='w-full h-full absolute top-0 left-0 z-0' />
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  return (
    <div className='px-5 md:px-0'>
      <div className="pt-16 pb-10 text-center text-5xl font-extrabold text-black dark:text-white">
        <HashTag className='w-8 h-8 mx-auto' />标签
      </div>
      <div id='tags-list' className='w-full flex-wrap'>
        {tagOptions.map(tag => {
          return (
            <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`} passHref
              className={'cursor-pointer font-light text-sm duration-200 mr-2 my-2 py-1 px-3 rounded-full ' +
                ' bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-200 ' +
                ' hover:bg-sky-500 hover:text-white dark:hover:text-white'}>
              <span className='font-normal'>{tag.name}</span> <span className='font-light'>{tag.count}</span>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 文章列表
 */
const LayoutPostList = (props) => {
  return <div className='px-5 md:px-0'>
    {siteConfig('POST_LIST_STYLE') === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
  </div>
}


// --- 核心修复：确保所有导出的组件都有定义 ---
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
