// themes/heo/components/Hero.js
// 最终版本：左侧为两个功能卡片 (TikTok, Facebook)，右侧为 YouTube 直播嵌入窗口。

import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 顶部英雄区 (最终版)
 * 左右布局，
 * 左侧：两个功能卡片
 * 右侧：直播嵌入窗口
 * @returns
 */
const Hero = props => {
  const HEO_HERO_REVERSE = siteConfig('HEO_HERO_REVERSE', false, CONFIG)
  return (
    <div
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${HEO_HERO_REVERSE ? 'xl:flex-row-reverse' : ''}
           recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative`}>
        
        {/* 左侧功能卡片组 */}
        <FeatureCardGroup {...props} />

        {/* 中间留白 */}
        <div className='px-1.5 h-full'></div>

        {/* 右侧直播嵌入窗口 */}
        <LiveStreamEmbed />
      </div>
    </div>
  )
}

/**
 * 右侧的直播嵌入组件
 * @returns {JSX.Element}
 */
const LiveStreamEmbed = () => {
  return (
    <div id="live-stream-wrapper" className="flex flex-col flex-1">
      <div className="w-full h-full rounded-xl shadow-lg overflow-hidden">
        {/* 响应式容器 (9:16 竖屏比例，适合手机) */}
        <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0, overflow: 'hidden' }}>
          <iframe 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src="https://www.youtube.com/embed/h6ybmZY53zk" // <-- 您提供的 YouTube 链接 ID
            title="YouTube Live Stream" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

/**
 * 左侧的功能卡片组
 * @returns {JSX.Element}
 */
function FeatureCardGroup(props) {
  // --- 在这里定义您的两个卡片信息 ---
  const card1 = {
    title: 'TikTok',
    subtitle: '直播订阅',
    url: 'https://vt.tiktok.com/ZSHGDjda1hkwq-Pz4h9/', // <-- 您提供的 TikTok 链接
    img: '/images/tiktok.jpg', // <-- 您提供的图片路径
    color: 'from-pink-500/60' // TikTok 风格的渐变色
  }

  const card2 = {
    title: 'Facebook',
    subtitle: '发消息',
    url: 'https://www.facebook.com/share/16fpFsbhh2/', // <-- 您提供的 Facebook 链接
    img: '/images/jlq.png', // <-- 您提供的图片路径
    color: 'from-blue-500/60' // Facebook 风格的渐变色
  }

  return (
    // 左侧容器
    <div
      id='bannerGroup'
      className='flex flex-col justify-between flex-1 mr-2 max-w-[42rem] space-y-3' // 使用 space-y-3 添加卡片间距
    >
      <FeatureCard {...card1} />
      <FeatureCard {...card2} />
    </div>
  )
}

/**
 * 单个功能卡片组件 (用于左侧)
 * @param {object} props - title, subtitle, url, img, color
 * @returns {JSX.Element}
 */
const FeatureCard = ({ title, subtitle, url, img, color }) => {
  return (
    <SmartLink href={url} className='group relative block w-full h-full rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300'>
      {/* 背景图 */}
      <LazyImage src={img} alt={title} className='absolute inset-0 w-full h-full object-cover'/>
      {/* 渐变遮罩 (使用动态颜色) */}
      <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent`}></div>
      {/* 文字内容 */}
      <div className='absolute bottom-0 left-0 p-4 text-white'>
        <h3 className='font-bold text-xl'>{title}</h3>
        {subtitle && <p className='text-sm opacity-80'>· {subtitle}</p>}
      </div>
    </SmartLink>
  )
}

// 移除了不再需要的 Banner, GroupMenu, TagsGroupBar, TopGroup 等旧组件
export default Hero
