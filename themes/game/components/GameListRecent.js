/* eslint-disable @next/next/no-img-element */
import { deepClone } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useGameGlobal } from '..'

/**
 * 游戏列表- 最近游戏
 * @returns
 */
export const GameListRecent = ({ maxCount = 14 }) => {
  const { recentGames } = useGameGlobal()
  const gamesClone = deepClone(recentGames)
  // 构造一个List<Component>
  const components = []

  let index = 0
  // 无限循环
  while (gamesClone?.length > 0 && index < maxCount) {
    const item = gamesClone?.shift()
    if (item) {
      // isLargeCard 属性现在不再需要，可以移除
      components.push(<GameItem key={index} item={item} />)
      index++
    }
    continue
  }

  if (components.length === 0) {
    return <></>
  }

  return (
    <>
      {/* 移除了 overflow-x-auto，因为不再需要横向滚动 */}
      <div className='game-list-recent-wrapper w-full pt-4 px-2 md:px-0'>
        {/* 关键修改：
            1. 移除了 md:flex 和 grid-flow-col
            2. 使用 grid grid-cols-3 创建一个3列的网格布局
            3. 使用 gap-3 设置卡片之间的间距
        */}
        <div className='game-grid grid grid-cols-3 gap-3'>
          {components?.map((ItemComponent, index) => {
            return ItemComponent
          })}
        </div>
      </div>
    </>
  )
}

/**
 * 游戏=单卡
 * @param {*} param0
 * @returns
 */
const GameItem = ({ item }) => {
  const router = useRouter()
  const { recentGames, setRecentGames } = useGameGlobal()
  const { title } = item || {}
  const [showType, setShowType] = useState('img') // img or video
  const [isClockVisible, setClockVisible] = useState(true)
  const toggleIcons = () => {
    setClockVisible(!isClockVisible)
  }
  /**
   * 移除最近
   */
  const removeRecent = () => {
    const updatedRecentGames = deepClone(recentGames) // 创建一个 recentGames 的副本
    const indexToRemove = updatedRecentGames.findIndex(
      game => game?.title === item.title
    ) // 找到要移除的项的索引
    if (indexToRemove !== -1) {
      updatedRecentGames.splice(indexToRemove, 1) // 使用 splice 方法删除项
      setRecentGames(updatedRecentGames) // 更新 recentGames 状态
      localStorage.setItem('recent_games', JSON.stringify(updatedRecentGames))
    }
  }

  const handleButtonClick = () => {
    router.push(item?.href) // 如果是 Next.js
  }

  const img = item?.pageCoverThumbnail
  const video = item?.ext?.video

  return (
    <div
      onClick={handleButtonClick}
      onMouseOver={() => {
        setShowType('video')
      }}
      onMouseOut={() => {
        setShowType('img')
      }}
      title={title}
      /* 关键修改：
         1. 移除了固定的 h-28 w-28
         2. 添加了 aspect-[3/4] 来创建竖屏效果 (宽3高4的比例)，卡片会自动适应网格列宽
      */
      className={`cursor-pointer card-single aspect-[3/4] relative shadow rounded-md overflow-hidden flex justify-center items-center 
                group hover:border-purple-400`}>
      <button
        className='absolute right-0.5 top-1 z-20'
        onClick={e => {
          e.stopPropagation() // 阻止事件冒泡，防止触发父级元素的点击事件
          removeRecent()
        }}
        onMouseEnter={toggleIcons}
        onMouseLeave={toggleIcons}>
        {isClockVisible ? (
          <i className='fas fa-clock-rotate-left w-6 h-6 flex items-center justify-center shadow rounded-full bg-white text-blue-500 text-sm'></i>
        ) : (
          <i className='fas fa-trash-can w-6 h-6 flex items-center justify-center shadow rounded-full bg-white text-red-500 text-sm'></i>
        )}
      </button>

      {/* 将标题移到底部，并添加左右内边距，使其在窄卡片上显示更好 */}
      <div className='absolute text-sm bottom-2 left-0 right-0 px-1 text-center transition-all duration-200 text-white z-30 truncate'>
        {title}
      </div>
      <div className='h-1/2 w-full absolute left-0 bottom-0 z-20 opacity-75 transition-all duration-200'>
        <div className='h-full w-full absolute bg-gradient-to-b from-transparent to-black'></div>
      </div>

      {showType === 'video' && (
        <video
          /* 关键修改：确保视频能填满新的卡片尺寸 */
          className='z-10 object-cover w-full h-full absolute'
          loop={true}
          autoPlay
          muted // 建议自动播放视频静音
          playsInline // 提高在移动设备上的兼容性
          preload='none'>
          <source src={video} type='video/mp4' />
        </video>
      )}
      <img
        /* 无需修改，w-full h-full object-cover 已经能很好地适应容器 */
        className='w-full h-full absolute object-cover group-hover:scale-105 duration-100 transition-all'
        src={img}
        alt={title}
      />
    </div>
  )
    }
