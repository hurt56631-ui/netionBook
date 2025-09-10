// themes/heo/components/PwaInstallPrompt.js

import { useEffect, useState } from 'react'

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // 阻止浏览器默认的安装提示
      e.preventDefault()
      // 保存事件，以便稍后触发
      setDeferredPrompt(e)
      
      // 等待 15 秒后显示我们的自定义提示横幅
      setTimeout(() => {
        setShowInstallBanner(true)
      }, 15000) // 15秒，你可以根据需要调整
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // 隐藏我们的横幅
    setShowInstallBanner(false)
    // 显示浏览器原生的安装提示
    deferredPrompt.prompt()
    // 等待用户响应
    const { outcome } = await deferredPrompt.userChoice
    // 用户操作后，清理 deferredPrompt
    console.log(`User response to the install prompt: ${outcome}`)
    setDeferredPrompt(null)
  }

  const handleCloseClick = () => {
    setShowInstallBanner(false)
  }

  // 如果没有安装事件，或者横幅被设置为不显示，则不渲染任何东西
  if (!showInstallBanner || !deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-50 p-4 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-2xl animate-fade-in-up border border-gray-200 dark:border-gray-700 max-w-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img src="/icons/icon-192x192.png" alt="App Icon" className="w-12 h-12 rounded-md" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-800 dark:text-gray-200">安装中文学习网站 App</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            获得更快的访问速度和离线体验！
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              安装
            </button>
            <button
              onClick={handleCloseClick}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              不了，谢谢
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PwaInstallPrompt
