// themes/heo/components/BlogPostCard.js
// 这个版本将卡片设置为纯图片展示模式，不再渲染任何文字内容，并添加了间隔。

import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 博客文章卡片：纯图片展示模式
 * @param {object} props
 * @param {object} props.post - 文章数据
 * @param {number} props.index - 文章索引
 * @param {object} props.siteInfo - 站点信息
 * @returns {JSX.Element}
 */
const BlogPostCard = ({ index, post, siteInfo }) => {
  // 如果文章没有封面，并且配置了默认封面，则使用站点默认封面
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  // 确认是否展示封面 (只要 post?.pageCoverThumbnail 存在，并且配置允许显示封面，就显示)
  const showPageCover = siteConfig('HEO_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail; 

  return (
    // 最外层容器：定义了卡片的尺寸、圆角、阴影和交互动画。
    // h-[56.25vw] 实现 16:9 的宽屏比例，md/lg 屏幕有固定的高度。
    // *** 关键修改在这里：添加了 mb-6 来提供底部外边距 ***
    <article className='w-full h-[56.25vw] md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md group transform hover:-translate-y-1 duration-300 mb-4'>
      {/* 整个卡片是一个可点击的链接 */}
      <SmartLink href={post?.href} passHref legacyBehavior>
        {/* 相对定位容器，作为图片绝对定位的基准 */}
        <div className='relative w-full h-full'>
          
          {/* 封面图片：使用绝对定位铺满整个卡片 */}
          {showPageCover && (
            <LazyImage
              priority={index < 4} // 优化首屏前几张图片的加载速度
              src={post?.pageCoverThumbnail}
              alt={post?.title} // 保留alt属性，对搜索引擎友好
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out'
            />
          )}

          {/* !!! 所有文字内容（标题、摘要、分类、标签等）已在此版本中完全移除 !!! */}

        </div>
      </SmartLink>
    </article>
  )
}

export default BlogPostCard
