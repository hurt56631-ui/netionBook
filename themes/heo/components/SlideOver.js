// themes/heo/components/SlideOver.js
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
                {/* --- 关键修改 1：调整宽度 --- */}
                <Dialog.Panel className='pointer-events-auto relative w-60 max-w-md'> {/* 将 w-96 改为 w-60 */}
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
                    <div className='relative mt-6 flex-1 flex-col space-y-3 px-4 sm:px-6 dark:text-white '>
                      <section className='space-y-2 flex flex-col'>
                        <DarkModeBlockButton />
                      </section>

                      {/* --- 关键修改 2：添加分组标题和移除 English --- */}
                      <section className='space-y-2 flex flex-col'>
                        {/* 分组标题 1 */}
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>联系方式</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'facebook'} url={'/'} />
                          <Button title={'Tiktok'} url={'/about'} />
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>免费资料</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'hsk'} url={'/'} />
                          <Button title={'汉语'} url={'/about'} />
                        <div className='text-gray-500 dark:text-gray-400 font-semibold'>工具</div>
                        <div className='gap-2 grid grid-cols-2'>
                          <Button title={'字典'} url={'/'} />
                          <Button title={'朗读'} url={'/about'} />
                        </div>
                        {/*  */}
                        <div className='text-gray-500 dark:text-gray-400 font-semibold pt-4'>课程导航</div>
                        {/* 用户自定义菜单 (建站教程、往期整理、关于我 等) */}
                        <MenuListSide {...props} />
                        {/* "English" 按钮已被移除，因为它通常是 MenuListSide 的一部分。如果还显示，请在 Notion 菜单中删除它 */}
                      </section>

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
// ... (DarkModeBlockButton 和 Button 组件保持不变) ...
