/* eslint-disable @next/next/no-img-element */
import { AdSlot } from '@/components/GoogleAdsense'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

/**
 * 游戏列表 - 统一3列竖屏卡片布局
 * @returns
 */
export const GameListIndexCombine = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className='game-list-wrapper flex justify-center w-full'>
      {/* 关键修改：
          1. 移除了 md: lg: xl: 等响应式断点
          2. 直接使用 grid-cols-3，在所有屏幕尺寸上都强制为3列
          3. 调整了 gap-3 和 px-2 以适应手机屏幕
      */}
      <div className='game-grid mx-auto w-full grid grid-cols-3 gap-3 px-2 md:p-0'>
        {posts.map((post, index) => (
          // 始终渲染统一的 GameItem
          <GameItem key={post.id || index} item={post} />
        ))}
        {/* 你可以根据需要决定是否保留广告位 */}
        {/* <GameAd /> */}
      </div>
    </div>
  )
}

/**
 * 一个广告游戏大卡
 * @returns
 */
const GameAd = () => {
  return (
    // 将广告位也调整为竖屏卡片的大小，以保持布局一致
    <div className='card-group relative rounded-lg game-ad aspect-[3/4] w-full overflow-hidden col-span-3'>
      <AdSlot type='flow' />
      <div className='absolute left-0 right-0 w-full h-full flex flex-col justify-center items-center bg-white'>
        <p className='text-2xl'>{siteConfig('TITLE')}</p>
        <p>{siteConfig('DESCRIPTION')}</p>
      </div>
    </div>
  )
}

/**
 * 游戏=单卡 (已修改为统一的竖屏样式)
 * @param {*} param0
 * @returns
 */
const GameItem = ({ item }) => {
  const { title } = item
  const img = item.pageCoverThumbnail
  const [showType, setShowType] = useState('img') // img or video

  const video = item?.ext?.video
  return (
    <SmartLink
      title={title}
      href={`${item?.href}`}
      /* 关键修改：
         1. 移除了 isLargeCard 相关的所有样式 (如 h-80, h-full)
         2. 添加了 aspect-[3/4] 来创建统一的竖屏效果
      */
      className='card-single aspect-[3/4] w-full transition-all duration-200 shadow-md md:hover:scale-105 md:hover:shadow-lg relative rounded-lg overflow-hidden flex justify-center items-center
      group hover:border-purple-400'
      onMouseOver={() => {
        setShowType('video')
      }}
      onMouseOut={() => {
        setShowType('img')
      }}>
      {/* 调整了标题的样式，使其在小卡片上显示更佳 */}
      <div className='text-center absolute bottom-2 left-0 right-0 px-1 text-white z-30 transition-all duration-200 text-sm truncate'>
        {title}
      </div>

      <div className='h-1/2 w-full absolute left-0 bottom-0 z-20 opacity-75 transition-all duration-200'>
        <div className='h-full w-full absolute bg-gradient-to-b from-transparent to-black'></div>
      </div>

      {showType === 'video' && (
        <video
          // 确保视频填满整个卡片
          className='z-10 object-cover w-full h-full absolute'
          loop={true}
          autoPlay
          muted
          playsInline
          preload='none'>
          <source src={video} type='video/mp4' />
        </video>
      )}
      <LazyImage
        className='w-full h-full absolute object-cover group-hover:scale-105 duration-100 transition-all'
        src={img}
        priority
        alt={title}
        fill='full'
      />
    </SmartLink>
  )
               }
