// themes/heo/index.js (最终美化和功能重构版)

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
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
import { useEffect, useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'
import GlosbeSearchCard from '@/components/GlosbeSearchCard'
import AiChatAssistant from '@/components/AiChatAssistant' // 确保 AI 助手组件存在
import BottomNav from './components/BottomNav'
import PwaInstallPrompt from './components/PwaInstallPrompt'

// --- 宣传横幅图片数组 ---
const XUANCHUAN_BANNERS = ['/images/xuanchuan3.jpg', '/images/xuanchuan4.jpg', '/images/xuanchuan5.jpg']

// --- 使用 Portal 的稳定 Modal 组件 ---
const Modal = ({ isOpen, onClose, title, intro, children }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  if (!isOpen || !isMounted) {
    return null
  }

  return createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h3 className='modal-title'>{title}</h3>
        {intro && <p className='modal-intro'>{intro}</p>}
        <div className='modal-body'>{children}</div>
        <button onClick={onClose} className='modal-close-button'>
          关闭
        </button>
      </div>
    </div>,
    document.body
  )
}

// --- AI 助手 Portal ---
const AIAssistantPortal = ({ onClose }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  if (!isMounted) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] bg-white dark:bg-gray-900">
      <AiChatAssistant onClose={onClose} />
    </div>,
    document.body
  )
}


/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, slotTop, className, post } = props
  const { fullWidth } = useGlobal()
  const router = useRouter()
  const isIndex = router.pathname === '/'
  const isSlugPage = post && post.slug
  const headerSlot = (
    <header className="header-base">
      <Header {...props} />
      {isIndex ? (<><NoticeBar /><Hero {...props} /></>) : null}
    </header>
  )
  const slotRight = router.route === '/404' || fullWidth ? null : <SideRight {...props} />
  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]'
  const HEO_HERO_BODY_REVERSE = siteConfig('HEO_HERO_BODY_REVERSE', false, CONFIG)
  useEffect(() => { loadWowJS() }, [])
  return (
    <div id='theme-heo' className={`${siteConfig('FONT_STYLE')} app-container h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />
      {headerSlot}
      <main id='wrapper-outer' className={`w-full ${maxWidth} mx-auto relative md:px-5 flex-grow`}>
        <div id='container-inner' className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          <div className={`w-full h-auto ${className || ''}`}>{slotTop}{children}</div>
          <div className='lg:px-2'></div>
          <div className='hidden xl:block'>{slotRight}</div>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <PwaInstallPrompt />
    </div>
  )
}

// --- 可重用的功能按钮组件 ---
const FunctionButton = ({ title, icon, onClick, href, img, target }) => {
  const style = img ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}
  const content = (
    <>
      {img && <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div>}
      <div className='relative z-10 flex flex-col items-center justify-center'>
        <div className='function-button-icon'><i className={icon} /></div>
        <div className='function-button-title'>{title}</div>
      </div>
    </>
  )
  if (href) { return (<SmartLink href={href} target={target} className='function-button group' style={style}>{content}</SmartLink>)}
  return (<button onClick={onClick} className='function-button group' style={style}>{content}</button>)
}

// --- AI 助手大按钮 ---
const AIAssistantButton = ({ onClick }) => {
  return (<div className='px-5 md:px-0 my-4'><button onClick={onClick} className='ai-assistant-button'><i className='fas fa-robot text-2xl mr-3'></i><span className='text-lg font-bold'>与 AI 助手对话</span></button></div>)
}

// --- 新版快捷入口和学习工具 ---
const QuickAccessGrid = ({ setActiveModal }) => {
  const functions = [
    { title: '报名课程', icon: 'fa-solid fa-graduation-cap', modal: 'enroll' }, 
    { title: '找工作', icon: 'fa-solid fa-briefcase', modal: 'jobs' }, 
    { title: '试看课程', icon: 'fa-solid fa-video', modal: 'trial' }
  ]
  return (
    <div className='function-grid-container'>
      <h2 className='function-grid-title'>快捷入口</h2>
      <div className='grid grid-cols-3 gap-4'>
        {functions.map(func => <FunctionButton key={func.title} title={func.title} icon={func.icon} onClick={() => setActiveModal(func.modal)} />)}
      </div>
    </div>
  )
}

const StudyToolsGrid = ({ setActiveModal }) => {
  const functions = [
    { title: '书籍', icon: 'fa-solid fa-book', href: 'https://books.843075.xyz', target:'_blank' }, 
    { title: '语法', icon: 'fa-solid fa-pen-ruler', modal: 'grammar' }, 
    { title: '练习题', icon: 'fa-solid fa-file-pen', modal: 'exercises' }, 
    { title: '生词', icon: 'fa-solid fa-spell-check', modal: 'vocabulary' }, 
    { title: '常用短语', icon: 'fas fa-comments', modal: 'phrases' }, 
    { title: '拼音学习', icon: 'fas fa-font', modal: 'pinyin' }
  ]
  return (
    <div className='function-grid-container'>
      <h2 className='function-grid-title'>学习工具</h2>
      <div className='grid grid-cols-3 gap-4'>
        {functions.map(func => <FunctionButton key={func.title} title={func.title} icon={func.icon} href={func.href} onClick={() => setActiveModal(func.modal)} target={func.target}/>)}
      </div>
    </div>
  )
}

// --- 其他小组件 ---
const AskQuestionModule = () => {
  const facebookGroupUrl = "https://www.facebook.com/share/g/15Fh7mrpa8/";
  return (<div className='py-4'><a href={facebookGroupUrl} target="_blank" rel="noopener noreferrer" className='ask-question-card group'><div className='flex items-center'><i className='fas fa-question-circle text-3xl text-indigo-500 mr-4'></i><div><h3 className='font-bold text-lg dark:text-white'>提问交流</h3><p className='text-sm text-gray-500 dark:text-gray-400'>遇到学习问题？来这里和大家一起讨论！</p></div></div><i className='fas fa-arrow-right text-gray-400 group-hover:translate-x-1 transition-transform duration-200'></i></a></div>)
}

const RandomImageCard = ({ banners, linkUrl, alt }) => {
  const randomImage = useMemo(() => { if (!banners || banners.length === 0) { return '/images/default-xuanchuan.jpg'; } return banners[Math.floor(Math.random() * banners.length)]; }, [banners]);
  return (<section className='mt-4'><SmartLink href={linkUrl || '#'}><div className='rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300'><LazyImage src={randomImage} alt={alt} className="w-full h-auto" /></div></SmartLink></section>)
}

/**
 * 首页
 */
const LayoutIndex = props => {
  const [activeModal, setActiveModal] = useState(null)
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false)

  const handleOpenAssistant = useCallback(() => setIsAiAssistantOpen(true), [])
  const handleCloseAssistant = useCallback(() => setIsAiAssistantOpen(false), [])
  
  // --- 模态框数据定义 ---
  const modalData = {
    enroll: { title: '报名课程', intro: '...', children: ( /* 报名课程内容 */ ) },
    jobs: { title: '找工作', intro: '...', children: ( /* 找工作内容 */ ) },
    trial: { title: '试看课程', intro: '...', children: ( /* 试看课程内容 */ ) },
    //... (学习工具的模态框数据)
    grammar: { title: '语法学习', intro: '...', children: ( /* 语法内容 */ ) },
    exercises: { title: 'HSK练习题', intro: '...', children: ( /* 练习题内容 */ ) },
    vocabulary: { title: 'HSK生词', intro: '...', children: ( /* 生词内容 */ ) },
    phrases: { title: '常用短语', intro: '...', children: ( /* 短语内容 */ ) },
    pinyin: { title: '拼音学习', intro: '...', children: ( /* 拼音内容 */ ) }
  }

  const currentModal = modalData[activeModal]

  return (
    <>
      <div id='post-outer-wrapper' className='px-5 md:px-0'>
        <CategoryBar {...props} />
        <AIAssistantButton onClick={handleOpenAssistant} />
        <div className='my-4'><GlosbeSearchCard /></div>
        <QuickAccessGrid setActiveModal={setActiveModal} />
        <AskQuestionModule />
        {siteConfig('POST_LIST_STYLE') === 'page' ? (<BlogPostListPage {...props} />) : (<BlogPostListScroll {...props} />)}
        <StudyToolsGrid setActiveModal={setActiveModal} />
        <RandomImageCard banners={XUANCHUAN_BANNERS} linkUrl="#" alt="课程价格与联系信息" />
      </div>

      <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={currentModal?.title} intro={currentModal?.intro}>
        {currentModal?.children}
      </Modal>

      {isAiAssistantOpen && <AIAssistantPortal onClose={handleCloseAssistant} />}
    </>
  )
}

// ... (LayoutPostList, LayoutSearch, etc., and export statements remain unchanged)
const LayoutPostList=props=>{return <div id="post-outer-wrapper" className="px-5 md:px-0"><CategoryBar {...props}/>{siteConfig("POST_LIST_STYLE")==="page"?<BlogPostListPage {...props}/>:<BlogPostListScroll {...props}/>}</div>};const LayoutSearch=props=>{const{keyword}=props,router=useRouter(),currentSearch=keyword||router?.query?.s;return useEffect(()=>{currentSearch&&setTimeout(()=>{replaceSearchResult({doms:document.getElementsByClassName("replace"),search:currentSearch,target:{element:"span",className:"text-red-500 border-b border-dashed"}})},100)},[currentSearch]),<div currentSearch={currentSearch}><div id="post-outer-wrapper" className="px-5 md:px-0">{currentSearch?<div id="posts-wrapper">{siteConfig("POST_LIST_STYLE")==="page"?<BlogPostListPage {...props}/>:<BlogPostListScroll {...props}/>}</div>:<SearchNav {...props}/>}</div></div>};const LayoutArchive=props=>{const{archivePosts}=props;return <div className="p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]"><CategoryBar {...props} border={!1}/><div className="px-3">{Object.keys(archivePosts).map(archiveTitle=><BlogPostArchive key={archiveTitle} posts={archivePosts[archiveTitle]} archiveTitle={archiveTitle}/>)}</div></div>};const LayoutSlug=props=>{const{post:post,lock:lock,validPassword:validPassword}=props,{locale:locale,fullWidth:fullWidth}=useGlobal(),[hasCode,setHasCode]=useState(!1);useEffect(()=>{setHasCode(document.querySelectorAll('[class^="language-"]').length>0)},[]);const commentEnable=siteConfig("COMMENT_TWIKOO_ENV_ID")||siteConfig("COMMENT_WALINE_SERVER_URL")||siteConfig("COMMENT_VALINE_APP_ID")||siteConfig("COMMENT_GISCUS_REPO")||siteConfig("COMMENT_CUSDIS_APP_ID")||siteConfig("COMMENT_UTTERRANCES_REPO")||siteCode("COMMENT_GITALK_CLIENT_ID")||siteConfig("COMMENT_WEBMENTION_ENABLE"),router=useRouter(),waiting404=1e3*siteConfig("POST_WAITING_TIME_FOR_404");return useEffect(()=>{post||setTimeout(()=>{isBrowser&&!document.querySelector("#article-wrapper #notion-article")&&router.push("/404").then(()=>{console.warn("找不到页面",router.asPath)})},waiting404)},[post]),<><div className={`article h-full w-full ${fullWidth?"":"xl:max-w-5xl"} ${hasCode?"xl:w-[73.15vw]":""} bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4`}>{lock&&<PostLock validPassword={validPassword}/>}{!lock&&post&&<div className="mx-auto md:w-full md:px-5"><article id="article-wrapper" itemScope itemType="https://schema.org/Movie"><section className="wow fadeInUp p-5 justify-center mx-auto" data-wow-delay=".2s"><ArticleExpirationNotice post={post}/><AISummary aiSummary={post.aiSummary}/><WWAds orientation="horizontal" className="w-full"/>{post?.type==="Post"&&<PostCopyright {...props}/>}{post&&<NotionPage post={post}/>}<WWAds orientation="horizontal" className="w-full"/></section><ShareBar post={post}/>{post?.type==="Post"&&<div className="px-5"><RandomImageCard banners={XUANCHUAN_BANNERS} linkUrl="/jobs" alt="招聘信息"/></div>}</article>{fullWidth?null:<div className={commentEnable&&post?"":"hidden"}><hr className="my-4 border-dashed"/><div className="py-2"><AdSlot/></div><div className="duration-200 overflow-x-auto px-5"><div className="text-2xl dark:text-white"><i className="fas fa-comment mr-1"/>{locale.COMMON.COMMENTS}</div><Comment frontMatter={post} className=""/></div></div>}</div>}</div><FloatTocButton {...props}/></>};const Layout404=props=>{const{onLoading:onLoading,fullWidth:fullWidth}=useGlobal();return <><main id="wrapper-outer" className={`flex-grow ${fullWidth?"":"max-w-4xl"} w-screen mx-auto px-5`}><div id="error-wrapper" className="w-full mx-auto justify-center"><Transition show={!onLoading} appear={!0} enter="transition ease-in-out duration-700 transform order-first" enterFrom="opacity-0 translate-y-16" enterTo="opacity-100" leave="transition ease-in-out duration-300 transform" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 -translate-y-16" unmount={!1}><div className="error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl"><LazyImage className="error-img h-60 md:h-full p-4" src="https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif"/><div className="error-info flex-1 flex flex-col justify-center items-center space-y-4"><h1 className="error-title font-extrabold md:text-9xl text-7xl dark:text-white">404</h1><div className="dark:text-white">请尝试站内搜索寻找文章</div><SmartLink href="/"><button className="bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all">回到主页</button></SmartLink></div></div><div className="mt-12"><LatestPostsGroup {...props}/></div></Transition></div></main></>};const LayoutCategoryIndex=props=>{const{categoryOptions:categoryOptions}=props,{locale:locale}=useGlobal();return <div id="category-outer-wrapper" className="mt-8 px-5 md:px-0"><div className="text-4xl font-extrabold dark:text-gray-200 mb-5">{locale.COMMON.CATEGORY}</div><div id="category-list" className="duration-200 flex flex-wrap m-10 justify-center">{categoryOptions?.map(category=><SmartLink key={category.name} href={`/category/${category.name}`} passHref legacyBehavior><div className="group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150"><HashTag className="w-5 h-5 stroke-gray-500 stroke-2"/>{category.name}<div className="bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600">{category.count}</div></div></SmartLink>)}</div></div>};const LayoutTagIndex=props=>{const{tagOptions:tagOptions}=props,{locale:locale}=useGlobal();return <div id="tag-outer-wrapper" className="px-5 mt-8 md:px-0"><div className="text-4xl font-extrabold dark:text-gray-200 mb-5">{locale.COMMON.TAGS}</div><div id="tag-list" className="duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center">{tagOptions.map(tag=><SmartLink key={tag.name} href={`/tag/${tag.name}`} passHref legacyBehavior><div className="group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150"><HashTag className="w-5 h-5 stroke-gray-500 stroke-2"/>{tag.name}<div className="bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600">{tag.count}</div></div></SmartLink>)}</div></div>};

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
