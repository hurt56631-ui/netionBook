// components/ShareBar.js

import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/**
 * 分享栏 (已修改为居中显示)
 * @param {} param0
 * @returns
 */
const ShareBar = ({ post }) => {
  if (
    !JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) ||
    !post ||
    post?.type !== 'Post'
  ) {
    return <></>
  }

  return (
    // --- 关键修改在这里 ---
    <div className='m-1 overflow-x-auto'>
      <div className='flex w-full justify-center'> {/* 将 md:justify-end 改为 justify-center */}
        <ShareButtons post={post} />
      </div>
    </div>
    // --- 修改结束 ---
  )
}
export default ShareBar
