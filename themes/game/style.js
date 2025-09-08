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
    
    /* 书架主容器 - 包含所有书架行，并带有磨砂玻璃背景 */
    .bookshelf-main-container {
        /* 浅黑色背景，略透明，与全局背景 #1a1a1a 形成层次 */
        background-color: rgba(44, 44, 44, 0.6); 
        backdrop-filter: blur(8px); /* 磨砂玻璃效果，柔和模糊 */
        -webkit-backdrop-filter: blur(8px); /* 兼容Safari */
        border-radius: 12px; /* 圆角 */
        overflow: hidden; /* 防止内容溢出 */
        min-height: 100vh;
        padding: 8rem 2rem 5rem 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* 外部阴影，让容器浮动感更强 */
        position: relative; /* 为内部的 shelf-row 提供定位上下文 */
        z-index: 1; /* 确保它在全局背景之上 */
    }
    
    /* 包含所有书架行的外部容器 */
    .book-shelf-grid-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0; /* 每层书架之间由 shelf-row 的 margin-bottom 控制 */
    }

    /* 单个书架行容器 */
    .shelf-row {
        position: relative;
        margin-bottom: 9rem; /* 每层书架之间的垂直间距 */
        height: 16rem; /* 每层书架占据的高度 */
        display: flex; /* 让书本和木板在同一行 */
        flex-direction: column; /* 垂直堆叠书本区域和木板 */
        align-items: center; /* 书架隔板和书本区域居中对齐 */
        justify-content: flex-end; /* 让内容靠底部堆叠 */
    }
    
    /* 放置书本的容器 */
    .books-on-shelf {
        display: grid; /* 使用 Grid 布局书籍 */
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 响应式列，每本书最小150px宽 */
        gap: 1.5rem; /* 书本之间的紧凑间距 */
        height: calc(100% - 25px); /* 减去木板高度，确保书本区域高度 */
        padding-bottom: 5px; /* 确保书本底部略高于木板顶部 */
        position: relative;
        z-index: 15; /* 确保书本在木板之上 */
        width: 100%; /* 占据 shelf-row 的宽度 */
        max-width: 900px; /* 限制书架行的最大宽度，保持美观 */
        justify-content: center; /* Grid 内部内容居中 */
    }
    
    /* 书架木板的容器 */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 25px; /* 木板厚度 */
        transform-style: preserve-3d;
        perspective: 800px; /* 增加透视感 */
        z-index: 10; /* 确保木板在书籍之下，但在书架容器背景之上 */
        max-width: 1000px; /* 略宽于 books-on-shelf，形成视觉支撑 */
        width: 100%;
        margin: 0 auto; /* 居中 */
    }
    
    /* 木板的顶部表面 (使用 muban.jpg 作为纹理) */
    .shelf-plank::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px; /* 顶部平面的深度 */
        background-image: url('/images/muban.jpg'); /* 使用 muban.jpg 图片 */
        background-size: cover;
        background-position: center;
        transform: rotateX(80deg) translateZ(-5px); /* 旋转并向上平移，形成顶部透视 */
        transform-origin: bottom center;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5); /* 顶部阴影 */
        border-radius: 5px;
        filter: brightness(0.7) contrast(1.2); /* 调整亮度对比度，使其更深沉 */
    }
    
    /* 木板的正面 (使用 muban.jpg 作为纹理) */
    .shelf-plank::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; /* 木板厚度 */
        background-image: url('/images/muban.jpg'); /* 使用 muban.jpg 图片 */
        background-size: cover;
        background-position: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.6); /* 正面下方的投影 */
        border-radius: 5px;
        border-top: 1px solid rgba(255,255,255,0.1); /* 顶部高光 */
        filter: brightness(0.6) contrast(1.3); /* 调整亮度对比度，使其更深沉 */
    }
    
    /* 书本卡片 */
    .book-card-item { 
        height: 100%; 
        flex-shrink: 0; /* 防止书本被压缩 */
        display: flex;
        align-items: flex-end; /* 让书本底部对齐，配合 books-on-shelf 的 align-items: flex-end */
        /* width 和 height 在 book-cover-wrapper 中控制 */
        justify-content: center; /* 如果书本卡片有额外内容，可以居中 */
    }
    
    /* 包裹书本封面的容器，用于应用复杂的3D变换和阴影 */
    .book-cover-wrapper {
        transform-style: preserve-3d;
        /* 调整书本的初始transform，使其更像是放在平面上 */
        transform: perspective(1000px) rotateY(-8deg) rotateX(1deg); /* 略微倾斜 */
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
        transform: perspective(1000px) rotateY(-2deg) rotateX(0deg) translateY(-20px) translateZ(30px) scale(1.1);
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
    @media (max-width: 1024px) { /* 平板 */
        .books-on-shelf { grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; max-width: 700px; }
        .book-cover-wrapper { width: 130px; height: 195px; }
        .shelf-plank { max-width: 750px; }
    }
    @media (max-width: 768px) { /* 平板-窄屏 */
        .books-on-shelf { grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.8rem; max-width: 500px; }
        .book-cover-wrapper { width: 110px; height: 165px; }
        .shelf-plank { max-width: 550px; }
    }
    @media (max-width: 640px) { /* 手机 */
        .bookshelf-main-container { padding: 6rem 0.5rem 4rem 0.5rem; }
        .shelf-row { margin-bottom: 7rem; height: 13rem; }
        .books-on-shelf { 
            grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); /* 更小的书本 */
            gap: 0.5rem; 
            max-width: 380px; /* 适应更窄的屏幕 */
            padding-left: 0.5rem; 
            padding-right: 0.5rem;
            justify-content: center; /* 确保居中 */
        }
        .book-cover-wrapper { width: 90px; height: 135px; }
        .book-cover-wrapper::before { left: -12px; width: 12px; }
        .book-cover-wrapper::after { right: -6px; width: 6px; }
        .book-title-overlay { font-size: 0.8rem; padding: 1rem 0.3rem 0.8rem 0.3rem; }
        .shelf-plank { max-width: 420px; }
    }
  `}</style>)
}
