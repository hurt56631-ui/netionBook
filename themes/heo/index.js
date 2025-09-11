// themes/heo/index.js (最终修改版)

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
// PostAdjacent 已不再使用
// import PostAdjacent from './components/PostAdjacent' 
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
// PostRecommend 已不再使用
// import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'
import GlosbeSearchCard from '@/components/GlosbeSearchCard'
import BottomNav from './components/BottomNav'
import PwaInstallPrompt from './components/PwaInstallPrompt'

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
      {/* --- 已移除文章页顶部 PostHeader --- */}
      {/* {isSlugPage && !fullWidth ? <PostHeader {...props} isDarkMode={isDarkMode} /> : null} */}
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
      <BottomNav />
      <PwaInstallPrompt />
      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

// --- 可重用的功能区组件 ---
const FunctionButton = ({ title, icon, url, img }) => {
    // ... (FunctionButton code remains the same)
    const style = img ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {};
    const iconColorClass = img ? 'text-white' : 'text-gray-500 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-yellow-500';
    const textColorClass = img ? 'text-white' : 'text-gray-700 dark:text-gray-200';
    return (
        <SmartLink href={url} className='group relative flex flex-col justify-center items-center w-full h-24 bg-white dark:bg-[#1e1e1e] border dark:border-gray-700 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200 overflow-hidden' style={style}>
            {img && <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>}
            <div className='relative z-10'>
                <div className={`text-3xl ${iconColorClass} transition-colors duration-200`}><i className={icon} /></div>
                <div className={`mt-2 text-sm ${textColorClass}`}>{title}</div>
            </div>
        </SmartLink>
    )
}

const FunctionCategory = ({ category }) => {
    const [activeTab, setActiveTab] = useState(0);
    const activeSubCategory = category.subCategories[activeTab];

    return (
        <div className="py-4">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">{category.title}</h2>
            
            {/* 二级分类标签 */}
            <div className="flex justify-center mb-4 space-x-2">
                {category.subCategories.map((sub, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300'}`}
                    >
                        {sub.title}
                    </button>
                ))}
            </div>

            {/* 当前活动二级分类下的功能按钮 */}
            <div className='grid grid-cols-3 gap-4'>
                {activeSubCategory.items.map(item => <FunctionButton key={item.title} {...item} />)}
            </div>
        </div>
    );
};


// --- 快捷入口和学习工具的数据定义 ---
const quickAccessData = {
    title: "快捷入口",
    subCategories: [
        {
            title: "常用",
            items: [
                { title: '加入VIP', icon: 'fa-solid fa-crown', url: '/vip-page', img: '/images/vip.jpg' },
                { title: '找工作', icon: 'fa-solid fa-briefcase', url: '/jobs-page' },
                { title: '加入频道', icon: 'fa-solid fa-users', url: 'https://www.facebook.com/share/16fpFsbhh2/' },
            ]
        },
        {
            title: "社交",
            items: [
                { title: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://www.facebook.com/your-page' },
                { title: 'Telegram', icon: 'fa-brands fa-telegram', url: 'https://t.me/your-channel' },
                { title: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/your-channel' },
            ]
        }
    ]
};

const studyToolsData = {
    title: "学习工具",
    subCategories: [
        {
            title: "中文学习",
            items: [
                { title: '书籍', icon: 'fa-solid fa-book', url: 'https://notion-next-b.vercel.app/?theme=game', img: '/images/bg-study-01.jpg' },
                { title: '语法', icon: 'fa-solid fa-pen-ruler', url: '/grammar-page', img: '/images/bg-study-02.jpg' },
                { title: '练习题', icon: 'fa-solid fa-file-pen', url: '/exercise-page', img: '/images/bg-study-03.jpg' },
            ]
        },
        {
            title: "在线词典",
            items: [
                { title: '汉典', icon: 'fa-solid fa-spell-check', url: 'https://www.zdic.net/' },
                { title: 'Pleco', icon: 'fa-solid fa-mobile-screen-button', url: 'https://www.pleco.com/' },
                { title: '萌典', icon: 'fa-solid fa-cloud', url: 'https://www.moedict.tw/' },
            ]
        },
        {
            title: "视频学习",
            items: [
                { title: 'B站学习区', icon: 'fa-brands fa-bilibili', url: 'https://www.bilibili.com/v/channel/372093' },
                { title: 'YouTube Learn', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/learning' },
            ]
        }
    ]
};


/**
 * 新增的主页图片价格卡组件
 */
const HomepagePriceCard = () => {
    // ... (HomepagePriceCard code remains the same)
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

      <div className='my-4'>
       <GlosbeSearchCard />
      </div>
  
      {/* --- 使用新的带二级分类的功能区组件 --- */}
      <FunctionCategory category={quickAccessData} />
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      <FunctionCategory category={studyToolsData} />
      
      <HomepagePriceCard />
    </div>
  )
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  // ... (LayoutPostList code remains the same)
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
  // ... (LayoutSearch code remains the same)
  const { keyword } = props; const router = useRouter(); const currentSearch = keyword || router?.query?.s; useEffect(() => { if (currentSearch) { setTimeout(() => { replaceSearchResult({ doms: document.getElementsByClassName('replace'), search: currentSearch, target: { element: 'span', className: 'text-red-500 border-b border-dashed' } }) }, 100) } }, []);
  return (
    <div currentSearch={currentSearch}>
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (<BlogPostListPage {...props} />) : (<BlogPostListScroll {...props} />)}
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
  // ... (LayoutArchive code remains the same)
  const { archivePosts } = props;
  return (
    <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
      <CategoryBar {...props} border={false} />
      <div className='px-3'>
        {Object.keys(archivePosts).map(archiveTitle => (<BlogPostArchive key={archiveTitle} posts={archivePosts[archiveTitle]} archiveTitle={archiveTitle} />))}
      </div>
    </div>
  )
}

/**
 * 新增的招聘图片组件
 */
const RecruitmentCard = () => {
    // ... (RecruitmentCard code remains the same)
    const linkUrl = '/jobs'; const imageUrl = '/images/recruitment-banner.png';
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
  // ... (LayoutSlug code remains the same)
  const { post, lock, validPassword } = props; const { locale, fullWidth } = useGlobal(); const [hasCode, setHasCode] = useState(false); useEffect(() => { const hasCode = document.querySelectorAll('[class^="language-"]').length > 0; setHasCode(hasCode) }, []); const commentEnable = siteConfig('COMMENT_TWIKOO_ENV_ID') || siteConfig('COMMENT_WALINE_SERVER_URL') || siteConfig('COMMENT_VALINE_APP_ID') || siteConfig('COMMENT_GISCUS_REPO') || siteConfig('COMMENT_CUSDIS_APP_ID') || siteConfig('COMMENT_UTTERRANCES_REPO') || siteConfig('COMMENT_GITALK_CLIENT_ID') || siteConfig('COMMENT_WEBMENTION_ENABLE'); const router = useRouter(); const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000; useEffect(() => { if (!post) { setTimeout(() => { if (isBrowser) { const article = document.querySelector('#article-wrapper #notion-article'); if (!article) { router.push('/404').then(() => { console.warn('找不到页面', router.asPath) }) } } }, waiting404) } }, [post]);
  return (
    <>
      <div className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
        {lock && <PostLock validPassword={validPassword} />}
        {!lock && post && (
          <div className='mx-auto md:w-full md:px-5'>
            <article id='article-wrapper' itemScope itemType='https://schema.org/Movie'>
              <section className='wow fadeInUp p-5 justify-center mx-auto' data-wow-delay='.2s'>
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
                  <RecruitmentCard />
                </div>
              )}
            </article>
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                <div className='py-2'><AdSlot /></div>
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'><i className='fas fa-comment mr-1' />{locale.COMMON.COMMENTS}</div>
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

/**
 * 404
 */
const Layout404 = props => {
  // ... (Layout404 code remains the same)
  const { onLoading, fullWidth } = useGlobal();
  return (
    <>
      <main id='wrapper-outer' className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
          <Transition show={!onLoading} appear={true} enter='transition ease-in-out duration-700 transform order-first' enterFrom='opacity-0 translate-y-16' enterTo='opacity-100' leave='transition ease-in-out duration-300 transform' leaveFrom='opacity-100 translate-y-0' leaveTo='opacity-0 -translate-y-16' unmount={false}>
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
              <LazyImage className='error-img h-60 md:h-full p-4' src={'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'}></LazyImage>
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>404</h1>
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
                <SmartLink href='/'><button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>回到主页</button></SmartLink>
              </div>
            </div>
            <div className='mt-12'><LatestPostsGroup {...props} /></div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  // ... (LayoutCategoryIndex code remains the same)
  const { categoryOptions } = props; const { locale } = useGlobal();
  return (
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>{locale.COMMON.CATEGORY}</div>
      <div id='category-list' className='duration-200 flex flex-wrap m-10 justify-center'>
        {categoryOptions?.map(category => (<SmartLink key={category.name} href={`/category/${category.name}`} passHref legacyBehavior><div className={'group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'}><HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />{category.name}<div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>{category.count}</div></div></SmartLink>))}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  // ... (LayoutTagIndex code remains the same)
  const { tagOptions } = props; const { locale } = useGlobal();
  return (
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>{locale.COMMON.TAGS}</div>
      <div id='tag-list' className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>
        {tagOptions.map(tag => (<SmartLink key={tag.name} href={`/tag/${tag.name}`} passHref legacyBehavior><div className={'group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'}><HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />{tag.name}<div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>{tag.count}</div></div></SmartLink>))}
      </div>
    </div>
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
