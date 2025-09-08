/* eslint-disable react/no-unknown-property */
/**
 * 这里的样式是全局样式，修改这里会影响所有页面
 * @returns
 */
export function Style () {
  return (<style jsx global>{`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* -- 通用基础样式 -- */
    html {
        overflow-x: hidden;
    }

    body {
        -webkit-tap-highlight-color: transparent;
    }

    .animate__animated {
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both
    }

    #theme-game::-webkit-scrollbar,
    #wrapper::-webkit-scrollbar {
        display: none;
    }
    
    .notion-text-align-center {
        text-align: center;
    }

    .notion-text-align-right {
        text-align: right;
    }

    .lazy-image-placeholder {
      background: linear-gradient(90deg,#0001 33%,#0005 50%,#0001 66%) #f2f2f2;
      background-size: 300% 100%;
      animation: l1 1s infinite linear;
    }

    @keyframes l1 { 
        0% {background-position: right} 
    }


    /* --- 3D 书架和书本核心样式 --- */

    /* 头部搜索框区域 (保持在最上层) */
    #header-above {
        position: sticky;
        top: 0;
        z-index: 50; 
        background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%);
        padding-bottom: 2rem;
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
    }
    
    /* 书架主容器 */
    .bookshelf-main-container {
        /* >>>>>>> 调整为浅黑色背景和磨砂玻璃效果 <<<<<<< */
        background-color: rgba(44, 44, 44, 0.7); /* 略透明的深灰色，与全局背景 #1a1a1a 形成层次 */
        backdrop-filter: blur(8px); /* 磨砂玻璃效果，稍微降低模糊强度，更柔和 */
        -webkit-backdrop-filter: blur(8px); /* 兼容Safari */
        border-radius: 12px; /* 增加一些圆角 */
        overflow: hidden; /* 防止内容溢出 */
        
        /* ------------------------------------- */

        /* 移除原有的背景图片和内阴影，改为更简洁的风格 */
        /* background-image: none; */
        /* box-shadow: none; */ 
        
        min-height: 100vh;
        padding: 8rem 2rem 5rem 2rem;
        /* 可以添加一个轻微的外部阴影，让书架容器浮动感更强 */
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); 
    }
    
    /* 单个书架行（包含书本和木板） */
    .shelf-row {
        position: relative;
        margin-bottom: 9rem; /* 每层书架之间的垂直间距 */
        height: 16rem; /* 每层书架占据的高度 */
    }
    
    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* 书本底部对齐 */
        gap: 1.5rem; /* 书本之间的紧凑间距 */
        height: 100%;
        padding-bottom: 25px; /* 确保书本底部略高于木板正面 */
        flex-wrap: wrap; /* 允许书本在小屏幕上换行 */
    }
    
    /* 书架木板的容器 */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 25px; /* 木板厚度 */
        transform-style: preserve-3d;
        perspective: 800px;
        z-index: 10;
    }
    
    /* >>>>>>> 调整木板的颜色和渐变，使其与深色背景更协调 <<<<<<< */
    /* 木板的顶部表面 */
    .shelf-plank::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px; /* 顶部平面的深度 */
        background: #3a2e24; /* 更深的基色 */
        background-image: linear-gradient(to right, #4c3e30, #665038, #4c3e30); /* 深色木纹渐变 */
        transform: rotateX(80deg) translateZ(-5px); /* 旋转并向上平移，形成顶部透视 */
        transform-origin: bottom center;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.7); /* 顶部阴影更深 */
        border-radius: 5px;
    }
    
    /* 木板的正面 */
    .shelf-plank::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; /* 木板厚度 */
        background: #4c3e30; /* 更深的基色 */
        background-image: linear-gradient(to top, #3a2e24, #4c3e30 30%, #5e4a38); /* 深色木纹渐变 */
        box-shadow: 0 5px 15px rgba(0,0,0,0.8); /* 正面下方的投影更明显 */
        border-radius: 5px;
        border-top: 1px solid rgba(255,255,255,0.05); /* 顶部高光更细微 */
    }
    /* ----------------------------------------------------------- */

    /* 书本卡片 */
    .book-card-item { 
        height: 100%; 
        flex-shrink: 0; /* 防止书本被压缩 */
        display: flex;
        align-items: flex-end;
    }
    
    /* 包裹书本封面的容器，用于应用复杂的3D变换和阴影 */
    .book-cover-wrapper {
        transform-style: preserve-3d;
        transform: perspective(1000px) rotateY(-12deg) rotateX(1deg); /* 倾斜角度 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 弹性动画 */
        filter: drop-shadow(8px 12px 15px rgba(0, 0, 0, 0.7)); /* 初始阴影 */
        position: relative;
        width: 150px; /* 书本宽度 */
        height: 225px; /* 保持2:3比例 */
        border-radius: 8px; /* 圆角 */
        z-index: 15; /* 确保在木板之上 */
    }
    
    .book-cover-wrapper img {
        border-radius: 8px; /* 确保图片本身也有圆角 */
    }
    
    .book-cover-wrapper:hover {
        transform: perspective(1000px) rotateY(-3deg) rotateX(0deg) translateY(-20px) translateZ(30px) scale(1.1);
        filter: drop-shadow(15px 25px 40px rgba(0, 0, 0, 0.9));
        z-index: 50;
    }
    
    /* 书本左侧厚度（书脊） */
    .book-cover-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: -18px; /* 书脊宽度 */
        width: 18px; 
        height: 100%;
        /* >>>>>>> 调整书脊颜色 <<<<<<< */
        background: linear-gradient(to right, #1a1a1a 0%, #2a2a2a 30%, #3a3a3a 60%, #2a2a2a 90%, #1a1a1a 100%);
        box-shadow: inset -6px 0 12px rgba(0, 0, 0, 0.9);
        transform-origin: left;
        transform: rotateY(-75deg) translateZ(-8px);
        border-top-left-radius: 8px; 
        border-bottom-left-radius: 8px;
        z-index: -1;
    }
    
    /* 书本右侧厚度（书页侧边） */
    .book-cover-wrapper::after {
        content: '';
        position: absolute;
        top: 0;
        right: -10px; /* 侧边厚度 */
        width: 10px; 
        height: 100%;
        background-color: #f0ede1; /* 纸张颜色 */
        background-image: repeating-linear-gradient(to bottom, #f0ede1 0px, #f0ede1 1px, #e3dac7 1px, #e3dac7 2px, #f0ede1 2px, #f0ede1 3px);
        box-shadow: inset 3px 0 8px rgba(0, 0, 0, 0.4);
        transform-origin: right;
        transform: rotateY(60deg) translateZ(-5px);
        border-top-right-radius: 4px; 
        border-bottom-right-radius: 4px;
        z-index: -1; 
    }
    
    /* 书名在封面上显示 */
    .book-title-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        padding: 1.5rem 0.5rem 1rem 0.5rem;
        text-shadow: 2px 2px 5px rgba(0,0,0,0.9);
        pointer-events: none;
        z-index: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    
    /* 响应式调整 */
    @media (max-width: 640px) { /* 手机 */
        .bookshelf-main-container { padding: 6rem 1rem 4rem 1rem; }
        .shelf-row { margin-bottom: 8rem; height: 14rem; }
        .books-on-shelf { gap: 1rem; justify-content: flex-start; overflow-x: auto; padding-left: 1rem; padding-right: 1rem; }
        .book-cover-wrapper { width: 120px; height: 180px; }
        .book-cover-wrapper::before { left: -15px; width: 15px; }
        .book-cover-wrapper::after { right: -8px; width: 8px; }
        .book-title-overlay { font-size: 0.9rem; }
    }
  `}</style>)
}
