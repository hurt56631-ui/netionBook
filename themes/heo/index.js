// themes/heo/index.js (最终修复版，已添加 GlosbeSearchCard)

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

// --- 新增代码：导入 GlosbeSearchCard 组件 ---
// import GlosbeSearchCard from '@/components/GlosbeSearchCard'

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
        className={`w-full ${maxWidth} mx-auto relative md:px-5`}>
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
 * 功能按钮 (单个按钮样式)
 */
const FunctionButton = ({ title, icon, url, img }) => {
    // 定义内联样式，用于设置背景图片
    const style = img ? {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};
    
    // 根据是否存在图片，动态改变文字和图标的颜色
    const iconColorClass = img ? 'text-white' : 'text-gray-500 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-yellow-500';
    const textColorClass = img ? 'text-white' : 'text-gray-700 dark:text-gray-200';

    return (
        <SmartLink 
            href={url} 
            className='group relative flex flex-col justify-center items-center w-full h-24 bg-white dark:bg-[#1e1e1e] border dark:border-gray-700 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200 overflow-hidden'
            style={style}
        >
            {/* 如果有图片，则添加一个半透明的遮罩层，以确保文字可读性 */}
            {img && <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>}

            {/* 内容需要相对定位，使其在遮罩层之上 */}
            <div className='relative z-10 text-center'>
                <div className={`text-3xl ${iconColorClass} transition-colors duration-200`}>
                    <i className={icon} />
                </div>
                <div className={`mt-2 text-sm ${textColorClass}`}>
                    {title}
                </div>
            </div>
        </SmartLink>
    )
}


/**
 * 快捷入口功能区
 */
const QuickAccessGrid = () => {
    const functions = [
        { title: '加入VIP', icon: 'fa-solid fa-crown', url: '/vip-page' , img: '/images/vip.jpg' },
        { title: '找工作', icon: 'fa-solid fa-briefcase', url: '/jobs-page' },
        { title: '加入频道', icon: 'fa-solid fa-users', url: 'https://www.facebook.com/share/16fpFsbhh2/' },
    ]

    return (
        <div className='py-2'>
            <div className='grid grid-cols-3 gap-4'>
                {functions.map(func => <FunctionButton key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 学习工具功能区
 */
const StudyToolsGrid = () => {
    const functions = [
        { title: '字典', icon: 'fa-solid fa-book', url: '/words', img: '/images/bg-study-01.jpg' },
        { title: '语法', icon: 'fa-solid fa-pen-ruler', url: '/grammar-page', img: '/images/bg-study-02.jpg' },
        { title: '练习题', icon: 'fa-solid fa-file-pen', url: '/exercise-page', img: '/images/bg-study-03.jpg' },
    ]

    return (
        <div className='py-2'>
            <div className='text-2xl font-bold mb-4 text-center dark:text-white'>学习工具</div>
            <div className='grid grid-cols-3 gap-4'>
                {functions.map(func => <FunctionButton key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 新增的主页图片价格卡组件
 */
const HomepagePriceCard = () => {
    const imageUrl = '/images/zhuyetp.jpg'; 
    const linkUrl = '/price-info-page';
  
    return (
      <section className='mt-4 mx-auto max-w-7xl px-5'>
        <SmartLink href={linkUrl}>
          <div className='rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'>
            <LazyImage src={imageUrl} alt="课程价格与联系信息" className="w-full h-auto" />
          </div>
        </SmartLink>
      </section>
    )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      <CategoryBar {...props} />
      <QuickAccessGrid />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      <StudyToolsGrid />
      
      {/* --- 新增代码：在这里渲染 GlosbeSearchCard 组件 --- */}
      <div className='my-4'>
        <GlosbeSearchCard />
      </div>

      <HomepagePriceCard />
    </div>
  )
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <LayoutBase {...props}>
        <div id='post-outer-wrapper' className='px-5  md:px-0'>
        <CategoryBar {...props} />
        {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
        ) : (
            <BlogPostListScroll {...props} />
        )}
        </div>
    </LayoutBase>
  )
}

/**
 * 搜索
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [currentSearch]) // 依赖项改为 currentSearch
  return (
    <LayoutBase {...props}>
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </LayoutBase>
  )
}

/**
 * 归档
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
    <LayoutBase {...props}>
        <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
        <CategoryBar {...props} border={false} />
        <div className='px-3'>
            {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
                key={archiveTitle}
                posts={archivePosts[archiveTitle]}
                archiveTitle={archiveTitle}
            />
            ))}
        </div>
        </div>
    </LayoutBase>
  )
}

/**
 * 新增的招聘图片组件
 */
const RecruitmentCard = () => {
    const linkUrl = '/jobs'; 
    const imageUrl = '/images/recruitment-banner.png';

    return (
        <div className='my-4'>
            <SmartLink href={linkUrl}>
                <LazyImage src={imageUrl} alt="招聘信息" className="w-full h-auto rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200" />
            </SmartLink>
        </div>
    )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  const router = useRouter()
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#notion-article')
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
    <LayoutBase {...props} >
      <div id="article-wrapper" className="px-2 lg:p-8">
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <>
            <ArticleExpirationNotice post={post} />
            <NotionPage post={post} />
            {post?.type === 'Post' && <PostCopyright {...props} />}
            {post?.type === 'Post' && <RecruitmentCard />} {/* 招聘卡片替代相关文章 */}
            <PostAdjacent {...props} />
            <AdSlot type='in-article' />
            <WWAds orientation='horizontal' />

            <div className='pt-8'>
              <Comment frontMatter={post} />
              <AdSlot type='comment' />
            </div>
          </>
        )}
      </div>

      <div className='block lg:hidden'>
        <ShareBar post={post} />
      </div>

      <FloatTocButton {...props} />
    </LayoutBase>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <LayoutBase {...props}>
      <div className="text-black w-full h-screen text-center justify-center items-center flex flex-col">
        <div className="text-6xl">404</div>
        <div className="text-2xl">页面无法找到</div>
        <div onClick={() => router.push('/')} className="mt-8 text-gray-500 cursor-pointer">
          回到主页
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <LayoutBase {...props}>
      <div className='bg-white dark:bg-gray-700 px-10 py-10 shadow'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-th' />
          所有分类
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap'>
          {categoryOptions?.map(category => {
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                className='text-gray-500 dark:text-gray-300 dark:hover:text-white hover:text-black items-center justify-center flex
                             whitespace-nowrap h-10 px-10 cursor-pointer text-lg'>
                <i className={`${category.icon || 'fas fa-folder'} mr-4`} /> {category.name}({category.count})
              </SmartLink>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}


/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <LayoutBase {...props}>
      <div className='bg-white dark:bg-gray-700 px-10 py-10 shadow'>
        <div className='dark:text-gray-200 mb-5'>
          <i className='mr-4 fas fa-tag' />
          所有标签
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap'>
          {tagOptions.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <SmartLink
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  passHref
                  className={'cursor-pointer inline-block rounded-full hover:bg-gray-500 hover:text-white duration-200 mr-2 py-2 px-4 text-xs whitespace-nowrap text-gray-600 dark:text-gray-300 dark:hover:text-white'}
                >
                  <div className='font-light'>
                    {tag.color && <i className='fas fa-tag mr-1' style={{ color: tag.color }} />}
                    {tag.name}
                    {tag.count && <sup className='ml-1'>{tag.count}</sup>}
                  </div>
                </SmartLink>
              </div>
            )
          })}
        </div>
      </div>
    </LayoutBase>
  )
}

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
