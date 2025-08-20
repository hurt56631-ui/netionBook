// themes/heo/components/PostHeader.js
// 最终版本：固定背景图 + 最终优化版硬编码价格表

import LazyImage from '@/components/LazyImage'
import WavesArea from './WavesArea'

export default function PostHeader({ isDarkMode }) {
  // --- 1. 使用固定的背景图片 ---
  const headerImage = '/images/your-course-background.jpg'; // <-- 替换为您自己的图片路径

  return (
    <div
      id='post-bg'
      className='md:mb-0 -mb-5 w-full h-auto py-12 relative md:flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat z-10'>
      <style jsx>{`
        .coverdiv:after {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 110px -130px 500px 100px
            ${isDarkMode ? '#CA8A04' : '#0060e0'} inset;
        }
      `}</style>

      <div
        className={`${isDarkMode ? 'bg-black/50' : 'bg-black/30'} absolute top-0 w-full h-full py-10 flex justify-center items-center`}>
        <div
          id='post-cover-wrapper'
          className='coverdiv w-full h-full absolute top-0 left-0'>
          <LazyImage
            id='post-cover'
            className='w-full h-full object-cover'
            src={headerImage}
          />
        </div>

        {/* --- 2. 价格表 (居中显示，样式已优化) --- */}
        <div
          id='post-info'
          className='z-10 w-full max-w-3xl px-5 text-white bg-black/20 backdrop-blur-sm p-6 rounded-xl shadow-lg'>
            {/* 网课部分 */}
            <div className='flex justify-center items-center text-2xl font-bold mb-4'>
              <span>网课</span>
              <span className='text-sm font-normal opacity-70 ml-2'>(每周1-5)</span>
            </div>
            <div className='flex flex-col space-y-3 text-lg'>
                <div className='flex justify-between items-center'>
                    <div className='w-1/3 text-left pl-4'>口语</div>
                    <div className='w-1/3 text-center text-xl font-bold'>
                        <span className='text-yellow-400'>100</span>
                        <span>元/月</span>
                    </div>
                    <div className='w-1/3 text-right pr-4 text-sm opacity-80'>1小时/天</div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='w-1/3 text-left pl-4'>HSK</div>
                    <div className='w-1/3 text-center text-xl font-bold'>
                        <span className='text-yellow-400'>150</span>
                        <span>元/月</span>
                    </div>
                    <div className='w-1/3 text-right pr-4 text-sm opacity-80'>3小时/天</div>
                </div>
            </div>

            <hr className='my-6 border-white/20' />

            {/* 线下部分 */}
            <div className='flex justify-center items-center text-2xl font-bold mb-4'>
                <span>线下</span>
                <span className='text-sm font-normal opacity-70 ml-2'>(每周1-6)</span>
            </div>
            <div className='flex flex-col space-y-3 text-lg'>
                <div className='flex justify-between items-center'>
                    <div className='w-1/3 text-left pl-4'>口语</div>
                    <div className='w-1/3 text-center text-xl font-bold'>
                        <span className='text-green-400'>200</span>
                        <span>元/月</span>
                    </div>
                    <div className='w-1/3 text-right pr-4 text-sm opacity-80'>2小时/天</div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='w-1/3 text-left pl-4'>HSK</div>
                    <div className='w-1/3 text-center text-xl font-bold'>
                        <span className='text-green-400'>200</span>
                        <span>元/月</span>
                    </div>
                    <div className='w-1/3 text-right pr-4 text-sm opacity-80'>3小时/天</div>
                </div>
            </div>

            {/* 地址部分 */}
            <div className='mt-6 text-center text-sm opacity-80'>
                <p>仰光市某某区</p>
                <p>瑞丽市某某区</p>
            </div>
        </div>

        <WavesArea />
      </div>
    </div>
  )
}
