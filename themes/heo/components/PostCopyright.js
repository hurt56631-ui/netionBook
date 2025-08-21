// themes/heo/components/PostCopyright.js (文字居中版)
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

export default function PostCopyright() {
  if (!siteConfig('HEO_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }
  return (
    <section className='dark:text-gray-300 mt-6 mx-1 '>
      <ul className='text-center overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-900 bg-gray-100 p-5 leading-8 border-l-2 border-indigo-500 rounded-xl'>
        <li><strong>课程咨询:</strong> 请通过顶部社交媒体图标联系我们。</li>
        <li><strong>版权声明:</strong> 本站所有教学内容均为原创，未经许可，禁止转载。</li>
        <li><strong>特别说明:</strong> 学习效果因人而异，请根据自身情况选择合适的课程。</li>
      </ul>
    </section>
  )
}
