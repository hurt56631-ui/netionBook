// themes/heo/components/PostCopyright.js

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink' // SmartLink 依然保留，以防您未来想添加链接
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

/**
 * 版权声明 (自定义版本)
 * @returns
 */
export default function PostCopyright() {
  const router = useRouter()
  // 移除 path 相关的 state 和 effect，因为我们不再显示动态 URL
  // const [path, setPath] = useState(siteConfig('LINK') + router.asPath)
  // useEffect(() => {
  //   setPath(window.location.href)
  // })

  const { locale } = useGlobal()

  // 检查是否在配置文件中开启了版权声明
  if (!siteConfig('HEO_ARTICLE_COPYRIGHT', null, CONFIG)) {
    return <></>
  }

  return (
    <section className='dark:text-gray-300 mt-6 mx-1 '>
      <ul className='overflow-x-auto whitespace-nowrap text-sm dark:bg-gray-900 bg-gray-100 p-5 leading-8 border-l-2 border-indigo-500'>
        {/* --- 从这里开始修改为您的自定义内容 --- */}
        
        {/* 您可以自由地添加、删除或修改下面的 <li> 标签 */}
        
        <li>
          <strong>课程咨询:</strong> 请通过顶部社交媒体图标联系我们。
        </li>
        <li>
          <strong>版权声明:</strong> 本站所有教学内容均为原创，未经许可，禁止转载。
        </li>
        <li>
          <strong>特别说明:</strong> 学习效果因人而异，请根据自身情况选择合适的课程。
        </li>
        
        {/* 如果您想添加一个返回首页的链接，可以像这样： */}
        {/* <li>
          <SmartLink href={'/'} className='hover:underline'>
            返回首页
          </SmartLink>
        </li> */}
        
        {/* --- 修改到这里结束 --- */}
      </ul>
    </section>
  )
}
