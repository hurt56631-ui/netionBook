// themes/heo/components/AIChatDrawer.js (修改版)

import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import AiChatAssistant from './AiChatAssistant' // 导入我们强大的 AI 助手组件

/**
 * AI 聊天全屏抽屉组件
 * @param {boolean} isOpen - 是否打开
 * @param {function} onClose - 关闭时的回调函数
 */
const AIChatDrawer = ({ isOpen, onClose }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className='fixed inset-0 z-50'>
        {/*
          背景遮罩层现在由 AiChatAssistant 内部的背景图和透明度设置处理，
          所以我们不再需要这里的黑色遮罩。
        */}
        {/* <Transition.Child ...> ... </Transition.Child> */}

        <Transition.Child
          as={Fragment}
          enter='transform transition ease-in-out duration-300'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
          leave='transform transition ease-in-out duration-200'
          leaveFrom='translate-y-0'
          leaveTo='translate-y-full'
        >
          {/* 
            这里的 div 是整个抽屉的容器，
            我们将 AiChatAssistant 组件直接渲染在这里。
            我们不再需要自己的 header，因为 AiChatAssistant 有自己的 header，
            我们只需要把 onClose 函数传递给它即可。
          */}
          <div className='fixed inset-0 flex flex-col bg-white dark:bg-[#18171d]'>
            {/* 顶部标题栏，现在是固定的，并且与 AiChatAssistant 的内容区分开 */}
            <header className='fixed top-0 left-0 right-0 z-20 flex-shrink-0 flex items-center justify-between px-4 h-16 border-b dark:border-gray-800 bg-white/40 dark:bg-[#18171d]/40 backdrop-blur-lg'>
              <h2 className='text-lg font-bold text-gray-800 dark:text-gray-200'>AI 助手</h2>
              <button
                onClick={onClose}
                aria-label='关闭'
                className='p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              >
                <i className='fas fa-times text-xl' />
              </button>
            </header>
            
            {/* 聊天内容区 */}
            <div className='flex-1 overflow-hidden'>
                {/* 
                  渲染真正的 AI 助手组件。
                  注意：AiChatAssistant 组件本身会处理自己的滚动和布局，
                  所以我们只需要提供一个容器让它填充即可。
                */}
                <AiChatAssistant />
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  )
}

export default AIChatDrawer
