// themes/heo/components/PostCopyright.js (图片版)
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

export default function PostCopyright() {
  if (!siteConfig('HEO_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }
  return (
    <section className='mt-6 mx-1'>
      <SmartLink href="/contact-page"> {/* (可选) 为图片添加链接 */}
        <LazyImage src="/images/wenzhangtp.jpg" alt="课程咨询与版权信息" className="w-full h-auto rounded-xl" />
      </SmartLink>
    </section>
  )
}
