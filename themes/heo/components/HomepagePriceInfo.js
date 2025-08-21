// themes/heo/components/HomepagePriceInfo.js

import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

/**
 * 网站底部的联系信息和价格卡片
 * @returns {JSX.Element}
 */
export default function HomepagePriceInfo() {
  return (
    <section className='dark:text-gray-300 mt-12 mx-auto max-w-7xl px-5'>
      <div className='text-2xl font-bold mb-4 text-center dark:text-white'>课程价格与联系方式</div>
      <ul className='text-sm dark:bg-[#1e1e1e] bg-gray-100 p-5 leading-8 border-l-4 border-indigo-500 rounded-xl shadow-md'>
        {/* --- 在这里修改您的信息 --- */}
        
        <li className='font-bold text-lg'>【线上课程】</li>
        <li>
          <strong className='mr-2'>口语:</strong>
          <span className='text-yellow-500 font-bold'>100元/月</span> (1小时/天, 每周1-5)
        </li>
        <li>
          <strong className='mr-2'>HSK:</strong>
          <span className='text-yellow-500 font-bold'>150元/月</span> (3小时/天, 每周1-6)
        </li>

        <li className='font-bold text-lg mt-4'>【线下课程】</li>
        <li>
          <strong className='mr-2'>口语:</strong>
          <span className='text-green-500 font-bold'>200元/月</span> (2小时/天, 每周1-6)
        </li>
        <li>
          <strong className='mr-2'>HSK:</strong>
          <span className='text-green-500 font-bold'>200元/月</span> (3小时/天, 每周1-6)
        </li>

        <li className='mt-4'>
          <strong className='mr-2'>联系我们:</strong>
          请通过页面顶部的社交媒体图标联系我们进行咨询。
        </li>
        <li>
          <strong className='mr-2'>线下地址:</strong>
          仰光市某某区 / 瑞丽市某某区
        </li>
        
        {/* --- 修改结束 --- */}
      </ul>
    </section>
  )
}
