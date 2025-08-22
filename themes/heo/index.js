// themes/heo/index.js (最终修复版)

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
 * 快捷入口功能区 (小图标，用于顶部)
 */
const QuickAccessGrid = () => {
    const functions = [
        { title: '加入VIP', subtitle: '专属权益', url: '/vip-page', img: '/images/vip.jpg' },
        { title: '找工作', subtitle: '最新机会', url: '/jobs-page', img: '/images/access-jobs.jpg' },
        { title: '加入频道', subtitle: '社区交流', url: 'https://www.facebook.com/share/16fpFsbhh2/', img: '/images/access-community.jpg' },
        // { title: '口语', subtitle: '快速提升', url: '/category/口语', img: '/images/access-oral.jpg' }, // 第四个按钮已移除
    ]

    return (
        <div className='w-full px-5 py-2'>
            <div className='grid grid-cols-3 gap-2'> {/* 改回三列 */}
                {functions.map(func => <FeatureCard key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 学习工具功能区 (大图标，用于底部)
 */
const StudyToolsGrid = () => {
    const functions = [
        { title: '字典', subtitle: '在线查询', url: '/words', img: '/images/zidian.jpg' },
        { title: '语法', subtitle: '核心知识点', url: '/grammar-page', img: '/images/tool-grammar.jpg' },
        { title: '练习题', subtitle: '巩固提升', url: '/exercise-page', img: '/images/tool-exercise.jpg' },
    ]

    return (
        <div className='py-8 px-5'>
            <div className='text-2xl font-bold mb-4 text-center dark:text-white'>学习工具</div>
            <div className='grid grid-cols-3 gap-4'>
                {functions.map(func => <FeatureCard key={func.title} {...func} />)}
            </div>
        </div>
    )
}

/**
 * 新增的主页图片价格卡组件
 */
const HomepagePriceCard = () => {
    const imageUrl = '/images/zhuyetp.jpg'; // <-- 您提供的图片路径
    const linkUrl = '/price-info-page'; // <-- 设置整张图片点击后跳转的链接
  
    return (
      <section className='mt-12 mx-auto max-w-7xl px-5'>
        <SmartLink href={linkUrl}>
          <div className='rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'>
            <LazyImage src={imageUrl} alt="课程价格与联系信息" className="w-full h-auto" />
          </div>
        </SmartLink>
      </section>
    )
}


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
          <QuickAccessGrid />
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
    // --- 关键修改 1：移除全局背景图 ---
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <div className=''> {/* 移除半透明覆盖层 */}
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
        
        {/* --- 关键修改 2：将学习工具和价格卡移动到 LayoutIndex 中 --- */}
        {/* {isIndex && <StudyToolsGrid />} */}
        {/* {isIndex && <HomepagePriceCard />} */}
        <Footer />
        {HEO_LOADING_COVER && <LoadingCover />}
      </div>
    </div>
  )
}

/**
 * 新增的功能卡片组件 (带图片背景)
 */
const FeatureCard = ({ title, subtitle, url, img }) => {
  return (
    <SmartLink href={url} className='group relative block w-full h-24 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300'>
      <LazyImage src={img} alt={title} className='absolute inset-0 w-full h-full object-cover'/>
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
      <div className='absolute bottom-0 left-0 p-4 text-white'>
        <h3 className='font-bold text-lg'>{title}</h3>
        {subtitle && <p className='text-sm opacity-80'>· {subtitle}</p>}
      </div>
    </SmartLink>
  )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* --- 关键修改 3：恢复 CategoryBar，并按顺序渲染所有模块 --- */}
      <CategoryBar {...props} />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      <StudyToolsGrid />
      <HomepagePriceCard />
      {/* --- 修改结束 --- */}
    </div>
  )
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <div id='post-outer-wrapper' className='px-5  md:px-0'>
      <CategoryBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
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
  }, [])
  return (
    <div currentSearch={currentSearch}>
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
    </div>
  )
}

/**
 * 归档
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
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
  )
}

/**
 * 新增的招聘图片组件
 */
const RecruitmentCard = () => {
    const linkUrl = '/jobs'; // 点击招聘图片后跳转的链接
    const imageUrl = '/images/zhaopin.jpg'; // 您的招聘图片

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

  const [hasCode, setHasCode] = useState(false)

  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

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
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='mx-auto md:w-full md:px-5'>
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'>
              <section
                className='wow fadeInUp p-5 justify-center mx-auto'
                data-wow-delay='.2s'>
                <ArticleExpirationNotice post={post} />
                <AISummary aiSummary={post.aiSummary} />
                <WWAds orientation='horizontal' className='w-full' />
                
                {post?.type === 'Post' && <PostCopyright {...props} />}

                {post && <NotionPage post={post} />}
                <WWAds orientation='horizontal' className='w-full' />
              </section>

              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <div className='px-5'>
                  {/* --- 移除 PostAdjacent 和 PostRecommend，替换为招聘图片 --- */}
                  <RecruitmentCard />
                </div>
              )}
            </article>

            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                <div className='py-2'>
                  <AdSlot />
                </div>
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

// ... (所有其他布局组件的代码保持不变，并确保它们完整) ...

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
