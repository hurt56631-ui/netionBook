/* eslint-disable @next/next/no-img-element */
import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { PWA as initialPWA } from '@/components/PWA'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { deepClone, isBrowser, shuffleArray } from '@/lib/utils'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Announcement from './components/Announcement'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import BlogPostBar from './components/BlogPostBar'
import { Footer } from './components/Footer'
import GameEmbed from './components/GameEmbed'
import { GameListIndexCombine } from './components/GameListIndexCombine'
import { GameListRelate } from './components/GameListRealate'
import { GameListRecent } from './components/GameListRecent'
import GroupCategory from './components/GroupCategory'
import GroupTag from './components/GroupTag'
import Header from './components/Header'
import { MenuList } from './components/MenuList'
import PostInfo from './components/PostInfo'
import SideBarContent from './components/SideBarContent'
import SideBarDrawer from './components/SideBarDrawer'
import CONFIG from './config'
import { Style } from './style'

// 主题全局状态
const ThemeGlobalGame = createContext()
export const useGameGlobal = () => useContext(ThemeGlobalGame)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 */
const LayoutBase = props => {
  const {
    allNavPages,
    children,
    siteInfo,
    tagOptions,
    currentTag,
    categoryOptions,
    currentCategory
  } = props
  const searchModal = useRef(null)
  const [filterKey, setFilterKey] = useState('')

  const [filterGames, setFilterGames] = useState(
    deepClone(
      allNavPages?.filter(item =>
        item.tags?.some(
          t => t === siteConfig('GAME_RECOMMEND_TAG', 'Recommend', CONFIG)
        )
      )
    )
  )
  const [recentGames, setRecentGames] = useState([])
  const [sideBarVisible, setSideBarVisible] = useState(false)

  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <ThemeGlobalGame.Provider
      value={{
        searchModal,
        filterKey,
        setFilterKey,
        recentGames,
        setRecentGames,
        filterGames,
        setFilterGames,
        sideBarVisible,
        setSideBarVisible
      }}>
      <div
        id='theme-game'
        className={`${siteConfig('FONT_STYLE')} w-full h-full min-h-screen justify-center dark:bg-black dark:bg-opacity-50 dark:text-gray-300 scroll-smooth`}
        // >>>>>>> 修改点1: 设置背景图和磨砂玻璃效果 <<<<<<<
        style={{
          // 底层背景图
          backgroundImage: `url('/images/default_bg.jpg')`, 
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed', // 背景图固定不随滚动
          backgroundPosition: 'center',
          // 磨砂玻璃效果层，覆盖在背景图之上
          backdropFilter: 'blur(8px) brightness(1.0)', // 模糊度，亮度设为1.0即原图亮度
          WebkitBackdropFilter: 'blur(8px) brightness(1.0)', // 兼容Safari
          backgroundColor: 'rgba(0,0,0,0.2)' // 作为不支持backdrop-filter时的fallback，或磨砂层下方的颜色
        }}
      >
        <Style /> {/* 你的全局样式在这里加载 */}

        <div
          id='wrapper'
          className={'relative flex justify-between w-full h-full mx-auto'}>
          <div className='w-52 hidden xl:block relative z-10'>
            <div className='py-4 px-2 sticky top-0 h-screen flex flex-col justify-between'>
              <div className='select-none'>
                <Header siteInfo={siteInfo} />
                <MenuList {...props} />
              </div>
              <div className='w-full'>
                <AdSlot />
              </div>
            </div>
          </div>

          <main className='flex-grow w-full h-full flex flex-col min-h-screen overflow-x-auto md:p-2 relative'>
            <div className='relative z-10 flex-grow h-full'>{children}</div>
            <div className='relative z-10 w-full py-4'>
              <AdSlot type='in-article' />
            </div>
          </main>
        </div>

        <SideBarDrawer
          isOpen={sideBarVisible}
          onClose={() => {
            setSideBarVisible(false)
          }}>
          <SideBarContent siteInfo={siteInfo} {...props} />
        </SideBarDrawer>
      </div>
    </ThemeGlobalGame.Provider>
  )
}

/**
 * 首页
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const { siteInfo } = props
  return (
    <>
      <div className='p-2 xl:hidden'>
        <Header siteInfo={siteInfo} />
      </div>
      {/* >>>>>>> 修改点2: 移除 GameListRecent 组件 (观看记录) <<<<<<< */}
      {/* <GameListRecent /> */} 
      <LayoutPostList {...props} />
    </>
  )
}

// >>>>>>> 修改点3: 添加了 chunkArray 辅助函数 <<<<<<<
function chunkArray(array, size) {
  const chunkedArr = []
  let index = 0
  if (!array || array.length === 0) {
    return []
  }
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index))
    index += size
  }
  return chunkedArr
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { posts } = props
  const { filterKey } = useGameGlobal()
  let filteredBlogPosts = []
  if (filterKey && posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post?.tags ? post.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(filterKey.toLowerCase())
    })
  } else {
    filteredBlogPosts = deepClone(posts)
  }

  // >>>>>>> 修改点4: 每行显示的书本数量改为 3 <<<<<<<
  const booksPerRow = 3 // 每行显示的书本数量
  const bookRows = chunkArray(filteredBlogPosts, booksPerRow)

  return (
    <>
      <BlogPostBar {...props} />

      <div className='bookshelf-main-container'>
        {bookRows.length > 0 ? (
          bookRows.map((row, rowIndex) => (
            <div key={rowIndex} className='shelf-row'>
              <div className='books-on-shelf'>
                {row.map(post => (
                  <div key={post.id} className='book-card-item'>
                    <SmartLink href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}>
                      <div className='book-cover-wrapper'>
                        <img
                          src={post?.pageCover}
                          alt={post.title}
                          className='w-full h-full object-cover'
                        />
                        <div className="book-title-overlay">{post.title}</div>
                      </div>
                    </SmartLink>
                  </div>
                ))}
              </div>
              <div className='shelf-plank'></div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400">暂无内容</div>
        )}
      </div>
    </>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword, posts } = props
  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [])

  const { filterKey } = useGameGlobal()
  let filteredBlogPosts = []
  if (filterKey && posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(filterKey.toLowerCase())
    })
  } else {
    filteredBlogPosts = deepClone(posts)
  }

  return (
    <>
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} posts={filteredBlogPosts} />
      ) : (
        <BlogListScroll {...props} posts={filteredBlogPosts} />
      )}
    </>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <div className='mb-10 pb-20 md:py-12 p-3 min-h-screen w-full'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { setRecentGames } = useGameGlobal()
  const { post, siteInfo, allNavPages, recommendPosts, lock, validPassword } =
    props

  const relateGames = recommendPosts
  const randomGames = shuffleArray(deepClone(allNavPages))

  initialPWA(post, siteInfo)

  useEffect(() => {
    const recentGames = localStorage.getItem('recent_games')
      ? JSON.parse(localStorage.getItem('recent_games'))
      : []

    const existedIndex = recentGames.findIndex(item => item?.id === post?.id)
    if (existedIndex === -1) {
      recentGames.unshift(post)
    } else {
      const existingGame = recentGames.splice(existedIndex, 1)[0]
      recentGames.unshift(existingGame)
    }
    localStorage.setItem('recent_games', JSON.stringify(recentGames))

    setRecentGames(recentGames)
  }, [post])

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <div id='article-wrapper'>
          <div className='game-detail-wrapper w-full grow flex'>
            <div className={`w-full md:py-2`}>
              <GameEmbed post={post} siteInfo={siteInfo} />
              <div className='game-info dark:text-white py-2 px-2 md:px-0 mt-14 md:mt-0'>
                <div className='w-full'>
                  <GameListRelate posts={relateGames} />
                </div>
                {post && (
                  <div className='bg-white shadow-md my-2 p-4 rounded-md dark:bg-black'>
                    <PostInfo post={post} />
                    <NotionPage post={post} />
                    <AdSlot />
                    <ShareBar post={post} />
                    <Comment frontMatter={post} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <GameListIndexCombine posts={randomGames} />
        </div>
      )}
    </>
  )
}

/**
 * 404 页面
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/')
      }
    }, 3000)
  }, [])

  return (
    <>
      <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            <i className='mr-2 fas fa-spinner animate-spin' />
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>{locale.NAV.PAGE_NOT_FOUND_REDIRECT}</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 文章分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props

  return (
    <>
      <div
        id='category-list'
        className='duration-200 flex flex-wrap my-4 gap-2'>
        {categoryOptions?.map(category => {
          return (
            <SmartLink
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'bg-white rounded-lg hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
                }>
                {category.name}({category.count})
              </div>
            </SmartLink>
          )
        })}
      </div>
    </>
  )
}

/**
 * 文章标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div>
        <div id='tags-list' className='duration-200 flex flex-wrap my-4 gap-2'>
          {tagOptions.map(tag => {
            return (
              <SmartLink
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                passHref
                className={` select-none cursor-pointer flex bg-white rounded-lg hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white hover:shadow-xl dark:bg-gray-800`}>
                <i className='mr-1 fas fa-tag' />{' '}
                {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
              </SmartLink>
            )
          })}
        </div>
      </div>
    </>
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
