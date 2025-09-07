/* eslint-disable @next/next/no-img-element */
// 核心依赖
import { AdSlot } from '@/components/GoogleAdsense'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { deepClone, isBrowser, shuffleArray } from '@/lib/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import Header from './components/Header'
import { MenuList } from './components/MenuList'
import SideBarDrawer from './components/SideBarDrawer'
import SideBarContent from './components/SideBarContent'
import CONFIG from './config'
import { Style } from './style' // 确保 Style 组件从 './style' 导入
import Link from 'next/link'
import Image from 'next/image'

// 其他布局组件导入 (修复了路径)
import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import { PWA as initialPWA } from '@/components/PWA'
import ShareBar from '@/components/ShareBar'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { useRouter } from 'next/router'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from '@/components/BlogArchiveItem' // 路径修正
import { BlogListPage } from '@/components/BlogListPage' // 路径修正
import { BlogListScroll } from '@/components/BlogListScroll' // 路径修正
import BlogPostBar from './components/BlogPostBar'
import GameEmbed from './components/GameEmbed'
import { GameListIndexCombine } from './components/GameListIndexCombine'
import { GameListRelate } from './components/GameListRealate'
import PostInfo from './components/PostInfo'
import SmartLink from '@/components/SmartLink'

// 主题全局状态
const ThemeGlobalGame = createContext()
export const useGameGlobal = () => useContext(ThemeGlobalGame)

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, siteInfo } = props
  const [filterKey, setFilterKey] = useState('')
  const [sideBarVisible, setSideBarVisible] = useState(false)

  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <ThemeGlobalGame.Provider value={{ filterKey, setFilterKey, sideBarVisible, setSideBarVisible }}>
      <div id='theme-game' className={`${siteConfig('FONT_STYLE')} relative w-full h-full min-h-screen justify-center scroll-smooth`}>
        {/* 全局背景图层 (此方案下仅作为背景，上方会有书架) */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${siteConfig('GLOBAL_BACKGROUND_IMAGE', '/images/default_bg.jpg', CONFIG)})` }}
        ></div>
        {/* 磨砂玻璃效果层 (位于背景图上方，书架下方) */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>

        <Style /> {/* 样式组件在这里被调用，确保全局样式生效 */}

        <div id='wrapper' className='relative z-10 flex justify-between w-full h-full mx-auto'>
          {/* PC端左侧 */}
          <div className='w-52 hidden xl:block relative z-20'>
            <div className='py-4 px-2 sticky top-0 h-screen flex flex-col justify-between'>
              <div className='select-none'>
                <Header siteInfo={siteInfo} />
                <MenuList {...props} />
              </div>
              <div className='w-full'><AdSlot /></div>
            </div>
          </div>

          {/* 右侧主内容区域 */}
          <main className='flex-grow w-full h-full flex flex-col min-h-screen'>
            {children}
          </main>
        </div>
        <SideBarDrawer isOpen={sideBarVisible} onClose={() => setSideBarVisible(false)}>
          <SideBarContent siteInfo={siteInfo} {...props} />
        </SideBarDrawer>
      </div>
    </ThemeGlobalGame.Provider>
  )
}

/**
 * 书籍卡片组件 (为3D书架样式优化)
 */
const BookCard = ({ post }) => {
  if (!post) {
    return null
  }

  const bookUrl = post.slug
  const isExternal = bookUrl && (bookUrl.startsWith('http') || bookUrl.startsWith('//'))
  const linkProps = isExternal
    ? { href: bookUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { href: `/${post.slug}` }

  return (
    <div className="book-card-item"> {/* 使用为3D书架定制的类名 */}
      <Link {...linkProps} className="w-full h-full">
        <div className="book-cover-wrapper">
          <Image
            src={post?.pageCover || siteConfig('IMG_LAZY_LOAD_ERROR')}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            unoptimized={true}
          />
          <div className="book-title-overlay" title={post.title}>
            {post.title}
          </div>
        </div>
      </Link>
    </div>
  )
}

/**
 * 首页 (分层3D真实书架布局 - 最终版)
 */
const LayoutIndex = props => {
  const { posts, siteInfo } = props
  // 此处配置每层书架放几本书, 可以在 config.js 中配置
  const BOOKS_PER_SHELF = siteConfig('BOOKS_PER_SHELF', 6, CONFIG)

  // 安全检查：确保 posts 是一个数组并且过滤掉所有无效的 post 对象
  const validPosts = Array.isArray(posts) ? posts.filter(Boolean) : []

  // 将所有有效的书籍分组，每组代表一层书架
  const shelves = []
  if (validPosts.length > 0) {
    for (let i = 0; i < validPosts.length; i += BOOKS_PER_SHELF) {
      shelves.push(validPosts.slice(i, i + BOOKS_PER_SHELF))
    }
  }

  return (
    <>
      {/* 首页移动端顶部导航 (应用sticky效果) */}
      <div id='header-above' className='xl:hidden'>
        <div className='p-2'>
          <Header siteInfo={siteInfo} />
        </div>
      </div>

      <div className="bookshelf-main-container">
        {shelves.map((shelfBooks, index) => (
          // 每个 shelf-row 就是一层带木板的书架
          <div key={index} className="shelf-row">
            <div className="books-on-shelf">
              {shelfBooks.map(post => (
                <BookCard key={post.id} post={post} />
              ))}
            </div>
            <div className="shelf-plank"></div>
          </div>
        ))}
        {/* 如果没有任何书籍，显示友好提示 */}
        {shelves.length === 0 && (
            <div className='text-white/70 text-center text-lg p-10'>书架上暂时还没有书...</div>
        )}
      </div>
    </>
  )
}

// --- 以下是其他布局组件 ---

const LayoutPostList = (props) => {
  const { posts } = props;
  const { filterKey } = useGameGlobal();
  const validPosts = Array.isArray(posts) ? posts.filter(Boolean) : [];
  let filteredBlogPosts = validPosts
    ? filterKey
      ? validPosts.filter(post => {
        const tagContent = post?.tags ? post?.tags.join(' ') : '';
        const searchContent = post.title + post.summary + tagContent;
        return searchContent.toLowerCase().includes(filterKey.toLowerCase());
      })
      : [...validPosts]
    : [];

  return (
    <div className='p-4 relative z-10'>
      <BlogPostBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page'
        ? <BlogListPage posts={filteredBlogPosts} {...props} />
        : <BlogListScroll posts={filteredBlogPosts} {...props} />}
    </div>
  );
};

const LayoutSearch = (props) => {
  const { keyword } = props;
  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      });
    }
  }, [keyword]);
  return <LayoutPostList {...props} />;
};

const LayoutArchive = (props) => {
  const { archivePosts } = props;
  return (
    <div className='p-4 relative z-10'>
      <div className='mb-10 pb-20 md:py-12 p-3 min-h-screen w-full text-white'>
        {archivePosts && Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </div>
  );
};

const LayoutSlug = (props) => {
  const { post, siteInfo, allNavPages, recommendPosts, lock, validPassword } = props;
  const relateGames = recommendPosts;
  const randomGames = shuffleArray(deepClone(allNavPages));

  useEffect(() => {
    if (post && siteInfo) {
        initialPWA(post, siteInfo);
    }
  }, [post, siteInfo]);

  useEffect(() => {
    if (!post) return;
    const recentGames = JSON.parse(localStorage.getItem('recent_games')) || [];
    const existedIndex = recentGames.findIndex(item => item?.id === post?.id);
    if (existedIndex !== -1) {
      recentGames.splice(existedIndex, 1);
    }
    recentGames.unshift(post);
    localStorage.setItem('recent_games', JSON.stringify(recentGames.slice(0, 10)));
  }, [post]);

  return (
    <div className='p-4 text-white relative z-10'>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && post && (
        <div id='article-wrapper'>
          <div className='game-detail-wrapper w-full grow flex'>
            <div className='w-full md:py-2'>
              <GameEmbed post={post} siteInfo={siteInfo} />
              <div className='game-info py-2 px-2 md:px-0 mt-14 md:mt-0'>
                <div className='w-full'><GameListRelate posts={relateGames} /></div>
                <div className='bg-white/10 backdrop-blur-md shadow-md my-2 p-4 rounded-md dark:bg-black/20'>
                  <PostInfo post={post} />
                  <NotionPage post={post} />
                  <AdSlot />
                  <ShareBar post={post} />
                  <Comment frontMatter={post} />
                </div>
              </div>
            </div>
          </div>
          <GameListIndexCombine posts={randomGames} />
        </div>
      )}
    </div>
  );
};

const Layout404 = (props) => {
  const router = useRouter();
  const { locale } = useGlobal();
  useEffect(() => {
    setTimeout(() => {
      if (isBrowser && !document.getElementById('article-wrapper')) {
        router.push('/').catch(console.error);
      }
    }, 3000);
  }, [router]);

  return (
    <div className='text-white w-full h-screen text-center flex flex-col justify-center items-center relative z-10'>
      <div>
        <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
          <i className='mr-2 fas fa-spinner animate-spin' /> 404
        </h2>
        <div className='inline-block text-left h-32 leading-10'>
          <h2 className='m-0 p-0'>{locale.NAV.PAGE_NOT_FOUND_REDIRECT}</h2>
        </div>
      </div>
    </div>
  );
};

const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props;
  return (
    <div className='p-4 relative z-10'>
      <div id='category-list' className='duration-200 flex flex-wrap my-4 gap-2'>
        {categoryOptions?.map(category => (
          <Link key={category.name} href={`/category/${category.name}`} passHref>
            <div className='bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 text-white cursor-pointer px-5 py-2'>
              {category.name}({category.count})
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const LayoutTagIndex = (props) => {
  const { tagOptions } = props;
  return (
    <div className='p-4 relative z-10'>
      <div id='tags-list' className='duration-200 flex flex-wrap my-4 gap-2'>
        {tagOptions.map(tag => (
          <Link key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`} passHref>
            <a className='select-none cursor-pointer flex items-center bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 text-white duration-200 mr-2 py-1 px-2 text-xs'>
              <i className='mr-1 fas fa-tag' /> {tag.name + (tag.count ? `(${tag.count})` : '')}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};


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
