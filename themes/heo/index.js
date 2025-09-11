// themes/heo/index.js (最终修改版 - 重构主页功能区)

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
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
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

// --- 新增：可复用的模态框 (Modal) 组件 ---
const FunctionModal = ({ title, description, categories }) => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            <div className="space-y-4">
                {categories.map((category, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{category.title}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {category.items.map((item, itemIndex) => (
                                <SmartLink key={itemIndex} href={item.url} className="block text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <span className="text-sm text-gray-800 dark:text-gray-200">{item.title}</span>
                                </SmartLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 新增：可复用的带 Modal 触发的功能按钮组件 ---
const ModalFunctionButton = ({ title, icon, modalContent }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='group flex flex-col justify-center items-center w-full h-24 bg-white dark:bg-[#1e1e1e] border dark:border-gray-700 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200'
            >
                <div className="text-3xl text-gray-500 dark:text-gray-300 group-hover:text-indigo-500 dark:group-hover:text-yellow-500 transition-colors duration-200">
                    <i className={icon} />
                </div>
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">{title}</div>
            </button>

            <Transition show={isOpen} as="div" className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <Transition.Child
                    as="div"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                <Transition.Child
                    as="div"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    className="w-full max-w-md mx-auto"
                >
                    <div>
                        {modalContent}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full mt-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            关闭
                        </button>
                    </div>
                </Transition.Child>
            </Transition>
        </>
    );
};


// --- 快捷入口和学习工具的数据定义 ---
const quickAccessData = {
    报名课程: {
        title: "报名课程",
        description: "结合中缅教学方案，高效学习中文，价格比大部分缅甸机构更优惠！请通过以下方式联系我们，获取专属学习方案。",
        categories: [
            {
                title: "联系方式",
                items: [
                    { title: 'Telegram 联系', url: 'https://t.me/yourtelegramid' },
                    { title: 'Line 联系', url: 'https://line.me/ti/p/@yourlineid' },
                    { title: 'Viber 联系', url: 'viber://chat?number=+959XXXXXXXX' },
                    { title: 'Facebook 主页', url: 'https://www.facebook.com/share/1FSxz6cm2Z' },
                ]
            }
        ]
    },
    找工作: {
        title: "找工作",
        description: "我们机构与上百家工厂长期合作，为您提供仰光、泰国、新加坡、马来西亚、中国等地的中文相关工作岗位！",
        categories: [
            {
                title: "地区",
                items: [
                    { title: '仰光地区招聘', url: '/jobs/yangon' },
                    { title: '泰国地区招聘', url: '/jobs/thailand' },
                    { title: '新加坡地区招聘', url: '/jobs/singapore' },
                    { title: '马来西亚地区招聘', url: '/jobs/malaysia' },
                    { title: '中国地区招聘', url: '/jobs/china' },
                ]
            },
            {
                title: "操作",
                items: [
                    { title: '发布简历/咨询', url: '/resume' },
                ]
            }
        ]
    },
    试看课程: {
        title: "试看课程",
        description: "免费体验我们的教学质量，即刻开始您的中文学习之旅！",
        categories: [
            {
                title: "课程类型",
                items: [
                    { title: '入门发音课', url: '/trial/pronunciation' },
                    { title: 'HSK1 体验课', url: '/trial/hsk1' },
                    { title: '日常对话片段', url: '/trial/daily' },
                    { title: '查看更多试看', url: '/trials' },
                ]
            }
        ]
    },
};

const studyToolsData = {
    书籍: {
        title: "书籍推荐",
        description: "精选中文学习书籍，涵盖教材、读物和工具书。",
        categories: [
            {
                title: "HSK 教材",
                items: [
                    { title: 'HSK 标准教程 1', url: '/books/hsk1' },
                    { title: 'HSK 标准教程 2', url: '/books/hsk2' },
                    { title: 'HSK 标准教程 3', url: '/books/hsk3' },
                ]
            },
            {
                title: "儿童读物",
                items: [
                    { title: '快乐汉语', url: '/books/happy-chinese' },
                    { title: '中文图画书', url: '/books/picture-books' },
                ]
            }
        ]
    },
    语法: {
        title: "语法学习",
        description: "掌握中文语法结构，轻松构建句子！",
        categories: [
            {
                title: "基础语法",
                items: [
                    { title: '基本句型', url: '/grammar/basic-sentence' },
                    { title: '动词时态', url: '/grammar/verb-tenses' },
                    { title: '量词用法', url: '/grammar/measure-words' },
                ]
            },
            {
                title: "进阶语法",
                items: [
                    { title: '比较句', url: '/grammar/comparison' },
                    { title: '被动句', url: '/grammar/passive' },
                    { title: '疑问句', url: '/grammar/question' },
                ]
            },
        ]
    },
    练习题: {
        title: "HSK 练习题",
        description: "巩固所学知识，挑战不同难度的 HSK 练习题！",
        categories: [
            {
                title: "分级练习",
                items: [
                    { title: 'HSK1 练习', url: '/exercise/hsk1' },
                    { title: 'HSK2 练习', url: '/exercise/hsk2' },
                    { title: 'HSK3 练习', url: '/exercise/hsk3' },
                    { title: 'HSK4 练习', url: '/exercise/hsk4' },
                    { title: 'HSK5 练习', url: '/exercise/hsk5' },
                    { title: 'HSK6 练习', url: '/exercise/hsk6' },
                ]
            }
        ]
    },
    生词: {
        title: "HSK 生词",
        description: "按 HSK 等级分类的词汇表，助你高效记忆！",
        categories: [
            {
                title: "分级词汇",
                items: [
                    { title: 'HSK1 生词', url: '/vocab/hsk1' },
                    { title: 'HSK2 生词', url: '/vocab/hsk2' },
                    { title: 'HSK3 生词', url: '/vocab/hsk3' },
                    { title: 'HSK4 生词', url: '/vocab/hsk4' },
                    { title: 'HSK5 生词', url: '/vocab/hsk5' },
                    { title: 'HSK6 生词', url: '/vocab/hsk6' },
                ]
            }
        ]
    },
    短语: {
        title: "常用短语",
        description: "掌握常用中文短语，轻松应对日常交流！",
        categories: [
            {
                title: "生活场景",
                items: [
                    { title: '打招呼', url: '/phrases/greetings' },
                    { title: '购物', url: '/phrases/shopping' },
                    { title: '问路', url: '/phrases/directions' },
                    { title: '点餐', url: '/phrases/ordering-food' },
                ]
            },
            {
                title: "紧急情况",
                items: [
                    { title: '看医生', url: '/phrases/seeing-a-doctor' },
                    { title: '银行', url: '/phrases/bank' },
                    { title: '酒店入住', url: '/phrases/hotel' },
                    { title: '紧急情况', url: '/phrases/emergency' },
                ]
            }
        ]
    },
    拼音: {
        title: "拼音学习",
        description: "快速掌握中文发音，从零开始学拼音！",
        categories: [
            {
                title: "基础",
                items: [
                    { title: '拼音基础发音', url: '/pinyin/basics' },
                    { title: '声母韵母表', url: '/pinyin/charts' },
                    { title: '四声调学习', url: '/pinyin/tones' },
                ]
            },
            {
                title: "进阶",
                items: [
                    { title: '拼音易错点', url: '/pinyin/common-mistakes' },
                    { title: '拼音发音视频', url: '/pinyin/videos' },
                    { title: '拼音输入法', url: '/pinyin/typing' },
                ]
            }
        ]
    },
};

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

      {/* --- 新的快捷入口功能区 --- */}
      <div className="grid grid-cols-3 gap-4 py-4">
          <ModalFunctionButton 
              title="报名课程" 
              icon="fa-solid fa-graduation-cap" 
              modalContent={<FunctionModal {...quickAccessData.报名课程} />}
          />
          <ModalFunctionButton 
              title="找工作" 
              icon="fa-solid fa-briefcase" 
              modalContent={<FunctionModal {...quickAccessData.找工作} />}
          />
          <ModalFunctionButton 
              title="试看课程" 
              icon="fa-solid fa-video" 
              modalContent={<FunctionModal {...quickAccessData.试看课程} />}
          />
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        遇到学习问题？来这里和大家一起讨论！
        <SmartLink href="/forum" className="text-blue-500 hover:underline ml-2">提问交流 →</SmartLink>
      </div>
      
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}

      {/* --- 新的学习工具功能区 --- */}
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">学习工具</h2>
        <div className="grid grid-cols-3 gap-4">
            <ModalFunctionButton 
                title="书籍" 
                icon="fa-solid fa-book" 
                modalContent={<FunctionModal {...studyToolsData.书籍} />}
            />
            <ModalFunctionButton 
                title="语法" 
                icon="fa-solid fa-pen-ruler" 
                modalContent={<FunctionModal {...studyToolsData.语法} />}
            />
            <ModalFunctionButton 
                title="练习题" 
                icon="fa-solid fa-file-pen" 
                modalContent={<FunctionModal {...studyToolsData.练习题} />}
            />
            <ModalFunctionButton 
                title="生词" 
                icon="fa-solid fa-font" 
                modalContent={<FunctionModal {...studyToolsData.生词} />}
            />
            <ModalFunctionButton 
                title="短语" 
                icon="fa-solid fa-comments" 
                modalContent={<FunctionModal {...studyToolsData.短语} />}
            />
            <ModalFunctionButton 
                title="拼音" 
                icon="fa-solid fa-microphone-lines" 
                modalContent={<FunctionModal {...studyToolsData.拼音} />}
            />
        </div>
      </div>
      
      <LazyImage src="/images/your-ad-image.jpg" alt="广告位" className="w-full h-auto rounded-xl my-4" />

    </div>
  )
}


// ... (LayoutPostList, LayoutSearch, LayoutArchive, RecruitmentCard, LayoutSlug, Layout404, LayoutCategoryIndex, LayoutTagIndex, and export statements remain unchanged)
const LayoutPostList = props => { return (<div id='post-outer-wrapper' className='px-5  md:px-0'><CategoryBar {...props} />{siteConfig('POST_LIST_STYLE') === 'page' ? (<BlogPostListPage {...props} />) : (<BlogPostListScroll {...props} />)}</div>) }
const LayoutSearch = props => { const { keyword } = props; const router = useRouter(); const currentSearch = keyword || router?.query?.s; useEffect(() => { if (currentSearch) { setTimeout(() => { replaceSearchResult({ doms: document.getElementsByClassName('replace'), search: currentSearch, target: { element: 'span', className: 'text-red-500 border-b border-dashed' } }) }, 100) } }, []); return (<div currentSearch={currentSearch}><div id='post-outer-wrapper' className='px-5  md:px-0'>{!currentSearch ? (<SearchNav {...props} />) : (<div id='posts-wrapper'>{siteConfig('POST_LIST_STYLE') === 'page' ? (<BlogPostListPage {...props} />) : (<BlogPostListScroll {...props} />)}</div>)}</div></div>) }
const LayoutArchive = props => { const { archivePosts } = props; return (<div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'><CategoryBar {...props} border={false} /><div className='px-3'>{Object.keys(archivePosts).map(archiveTitle => (<BlogPostArchive key={archiveTitle} posts={archivePosts[archiveTitle]} archiveTitle={archiveTitle} />))}</div></div>) }
const RecruitmentCard = () => { const linkUrl = '/jobs'; const imageUrl = '/images/recruitment-banner.png'; return (<div className='my-4'><SmartLink href={linkUrl}><LazyImage src={imageUrl} alt="招聘信息" className="w-full h-auto rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200" /></SmartLink></div>) }
const LayoutSlug = props => { const { post, lock, validPassword } = props; const { locale, fullWidth } = useGlobal(); const [hasCode, setHasCode] = useState(false); useEffect(() => { const hasCode = document.querySelectorAll('[class^="language-"]').length > 0; setHasCode(hasCode) }, []); const commentEnable = siteConfig('COMMENT_TWIKOO_ENV_ID') || siteConfig('COMMENT_WALINE_SERVER_URL') || siteConfig('COMMENT_VALINE_APP_ID') || siteConfig('COMMENT_GISCUS_REPO') || siteConfig('COMMENT_CUSDIS_APP_ID') || siteConfig('COMMENT_UTTERRANCES_REPO') || siteConfig('COMMENT_GITALK_CLIENT_ID') || siteConfig('COMMENT_WEBMENTION_ENABLE'); const router = useRouter(); const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000; useEffect(() => { if (!post) { setTimeout(() => { if (isBrowser) { const article = document.querySelector('#article-wrapper #notion-article'); if (!article) { router.push('/404').then(() => { console.warn('找不到页面', router.asPath) }) } } }, waiting404) } }, [post]); return (<><div className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>{lock && <PostLock validPassword={validPassword} />}{!lock && post && (<div className='mx-auto md:w-full md:px-5'><article id='article-wrapper' itemScope itemType='https://schema.org/Movie'><section className='wow fadeInUp p-5 justify-center mx-auto' data-wow-delay='.2s'><ArticleExpirationNotice post={post} /><AISummary aiSummary={post.aiSummary} /><WWAds orientation='horizontal' className='w-full' />{post?.type === 'Post' && <PostCopyright {...props} />}{post && <NotionPage post={post} />}<WWAds orientation='horizontal' className='w-full' /></section><ShareBar post={post} />{post?.type === 'Post' && (<div className='px-5'><RecruitmentCard /></div>)}</article>{fullWidth ? null : (<div className={`${commentEnable && post ? '' : 'hidden'}`}><hr className='my-4 border-dashed' /><div className='py-2'><AdSlot /></div><div className='duration-200 overflow-x-auto px-5'><div className='text-2xl dark:text-white'><i className='fas fa-comment mr-1' />{locale.COMMON.COMMENTS}</div><Comment frontMatter={post} className='' /></div></div>)}</div>)}</div><FloatTocButton {...props} /></>) }
const Layout404 = props => { const { onLoading, fullWidth } = useGlobal(); return (<><main id='wrapper-outer' className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}><div id='error-wrapper' className={'w-full mx-auto justify-center'}><Transition show={!onLoading} appear={true} enter='transition ease-in-out duration-700 transform order-first' enterFrom='opacity-0 translate-y-16' enterTo='opacity-100' leave='transition ease-in-out duration-300 transform' leaveFrom='opacity-100 translate-y-0' leaveTo='opacity-0 -translate-y-16' unmount={false}><div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'><LazyImage className='error-img h-60 md:h-full p-4' src={'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'}></LazyImage><div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'><h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>404</h1><div className='dark:text-white'>请尝试站内搜索寻找文章</div><SmartLink href='/'><button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>回到主页</button></SmartLink></div></div><div className='mt-12'><LatestPostsGroup {...props} /></div></Transition></div></main></>) }
const LayoutCategoryIndex = props => { const { categoryOptions } = props; const { locale } = useGlobal(); return (<div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'><div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>{locale.COMMON.CATEGORY}</div><div id='category-list' className='duration-200 flex flex-wrap m-10 justify-center'>{categoryOptions?.map(category => (<SmartLink key={category.name} href={`/category/${category.name}`} passHref legacyBehavior><div className={'group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'}><HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />{category.name}<div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>{category.count}</div></div></SmartLink>))}</div></div>) }
const LayoutTagIndex = props => { const { tagOptions } = props; const { locale } = useGlobal(); return (<div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'><div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>{locale.COMMON.TAGS}</div><div id='tag-list' className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>{tagOptions.map(tag => (<SmartLink key={tag.name} href={`/tag/${tag.name}`} passHref legacyBehavior><div className={'group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'}><HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />{tag.name}<div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>{tag.count}</div></div></SmartLink>))}</div></div>) }

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
