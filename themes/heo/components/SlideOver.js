// themes/heo/components/SlideOver.js
// 最终版本：恢复了自定义菜单，并添加了多个新的分组和按钮。

import DarkModeButton from '@/components/DarkModeButton'
import { useGlobal } from '@/lib/global'
import { Dialog, Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import {
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { MenuListSide } from './MenuListSide'
import TagGroups from './TagGroups'

/**
 * 侧边抽屉
 */
export default function SlideOver(props) {
  const { cRef, tagOptions } = props
  const [open, setOpen] = useState(false)
  const { locale } = useGlobal()
  const router = useRouter()
  useImperativeHandle(cRef, () => ({
    toggleSlideOvers: () => {
      setOpen(!open)
    }
  }))

  useEffect(() => {
    setOpen(false)
  }, [router])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 glassmorphism bg-black bg-opacity-30 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'>
                <Dialog.Panel className='pointer-events-auto relative w-68 max-w-md'> {/* 调整宽度 */}
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}>
                        <span className='sr-only'>Close panel</span>
                        <i className='fa-solid fa-xmark px-2'></i>
                      </button>
                    </div>
                  </Transition.Child>
                  {/* 内容 */}
                  <div className='flex h-full flex-col overflow-y-scroll bg-white dark:bg-[#18171d] py-6 shadow-xl'>
                    <div className='relative mt-6 flex-1 flex-col space-y-4 px-4 sm:px-6 dark:text-white '>
                      <section className='space-y-2 flex flex-col'>
                        <DarkModeBlockButton />
                      </section>

                      {/* --- 分组 1: 联系方式 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>联系方式</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'facbook'} url={'/'} icon={<i className='fa-solid fa-home'/>} />
                          <Button title={'tiktok'} url={'/about'} icon={<i className='fa-solid fa-user'/>} />
                        </div>
                      </section>
                      
                      {/* --- 关键恢复：您的 Notion 自定义菜单 --- */}
                      {/* 这个组件会渲染您在 Notion 中设置的 "建站教程"、"往期整理"、"关于我" 等 */}
                      <MenuListSide {...props} /> 
                      {/* --- 恢复结束 --- */}
                      
                      {/* --- 分组 2: 资料 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>资料</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'书籍'} url={'/books'} icon={<i className='fa-solid fa-book-open'/>} />
                          <Button title={'工具'} url={'/tools'} icon={<i className='fa-solid fa-toolbox'/>} />
                          <Button title={'软件'} url={'/software'} icon={<i className='fa-solid fa-computer'/>} />
                          {/* 占空 */}
                        </div>
                      </section>
                      
                      {/* --- 分组 3: 学习群 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>学习群</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'订阅频道'} url={'/subscribe'} icon={<i className='fa-solid fa-rss'/>} />
                          <Button title={'学习交流群'} url={'/community'} icon={<i className='fa-solid fa-users'/>} />
                        </div>
                      </section>

                      {/* --- 分组 4: 交友娱乐群 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>交友娱乐群</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'仰光'} url={'/group/yangon'} icon={<i className='fa-solid fa-location-dot'/>} />
                          <Button title={'泰国'} url={'/group/thailand'} icon={<i className='fa-solid fa-location-dot'/>} />
                          <Button title={'中国'} url={'/group/china'} icon={<i className='fa-solid fa-location-dot'/>} />
                          <Button title={'新加坡'} url={'/group/singapore'} icon={<i className='fa-solid fa-location-dot'/>} />
                        </div>
                      </section>
                      
                      {/* --- 分组 5: 单菜单 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='flex flex-col space-y-2'>
                          <Button title={'找工作频道'} url={'/jobs'} icon={<i className='fa-solid fa-briefcase'/>} />
                          <Button title={'关于我们'} url={'/about-us'} icon={<i className='fa-solid fa-info-circle'/>} />
                          <Button title={'App 下载'} url={'/app-download'} icon={<i className='fa-solid fa-download'/>} />
                          <Button title={'学习资源下载'} url={'/resources'} icon={<i className='fa-solid fa-file-arrow-down'/>} />
                          <Button title={'帮助'} url={'/help'} icon={<i className='fa-solid fa-question-circle'/>} />
                        </div>
                      </section>

                      {/* --- 分组 6: 标签 --- */}
                      <section className='space-y-2 flex flex-col'>
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>{locale.COMMON.TAGS}</div>
                        <TagGroups tags={tagOptions} />
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

/**
 * 一个包含图标的按钮
 */
function DarkModeBlockButton() {
  const darkModeRef = useRef()
  const { isDarkMode, locale } = useGlobal()

  function handleChangeDarkMode() {
    darkModeRef?.current?.handleChangeDarkMode()
  }
  return (
    <button
      onClick={handleChangeDarkMode}
      className={
        'group duration-200 hover:text-white hover:shadow-md hover:bg-blue-600 flex justify-between items-center px-2 py-2 border dark:border-gray-600 bg-white dark:bg-[#ff953e]  rounded-lg'
      }>
      <DarkModeButton cRef={darkModeRef} className='group-hover:text-white' />{' '}
      {isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
    </button>
  )
}

/**
 * 一个简单的按钮 (已修改为支持图标)
 */
function Button({ title, url, icon }) {
  return (
    <SmartLink
      href={url}
      className={
        'duration-200 hover:text-white hover:shadow-md flex cursor-pointer items-center gap-2 px-3 py-2 border dark:border-gray-600 bg-white hover:bg-blue-600 dark:bg-[#1e1e1e] rounded-lg'
      }>
      {icon}
      <span>{title}</span>
    </SmartLink>
  )
}
