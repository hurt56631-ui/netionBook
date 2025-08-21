// components/SplashScreen.js
import { useState, useEffect } from 'react';
import LazyImage from '@/components/LazyImage';

const SplashScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 检查 sessionStorage，看用户是否已经在当前浏览器会话中看过闪屏
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplashScreen');

    if (!hasSeenSplash) {
      setShow(true); // 如果没看过，就显示闪屏
      // 设置一个定时器，在 4 秒后隐藏闪屏
      const timer = setTimeout(() => {
        setShow(false);
        // 记录用户已经看过闪屏，这样刷新页面或切换页面时就不会再出现
        sessionStorage.setItem('hasSeenSplashScreen', 'true');
      }, 4000); // 4000 毫秒 = 4 秒，您可以修改这个时间

      // 组件卸载时清除定时器，防止内存泄漏
      return () => clearTimeout(timer);
    }
  }, []); // 空依赖数组表示只在组件首次挂载时运行一次

  if (!show) {
    return null; // 如果不显示，则不渲染任何内容
  }

  return (
    // 全屏覆盖的容器
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white z-[9999] transition-opacity duration-500 ease-out ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 您的广告图片 */}
      <LazyImage
        src="/images/splash-ad.jpg" // <-- 替换为您自己的广告图片路径
        alt="课程推广"
        className="w-full h-full object-cover"
      />
      
      {/* (可选) 右上角跳过按钮 */}
      <button
        onClick={() => {
          setShow(false);
          sessionStorage.setItem('hasSeenSplashScreen', 'true');
        }}
        className="absolute top-4 right-4 bg-black/30 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
      >
        跳过
      </button>
    </div>
  );
};

export default SplashScreen;
