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


    /* --- 新的 2D 书架和书本样式 --- */

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
    
    /* 书架主容器 - 2D */
    .bookshelf-main-container {
        min-height: 100vh;
        /* 根据图片调整padding */
        padding: 4rem 1rem 3rem 1rem; 
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); 
        background-color: rgba(255, 255, 255, 0.1); /* 半透明白色背景 */
        -webkit-backdrop-filter: blur(5px); 
        backdrop-filter: blur(5px);
        border-radius: 8px; 
        margin: 0.5rem; 
    }
    
    /* 单个书架行 - 2D */
    .shelf-row {
        position: relative;
        margin-bottom: 3rem; 
        padding-top: 1rem; 
        display: flex; 
        flex-wrap: wrap; 
        /* <<<<<<< 修改点1: 确保均匀分布且能一行3本 >>>>>>> */
        justify-content: space-around; /* 均匀分布，空间在项之间 */
        align-items: flex-end; 
        min-height: 15rem; 
        padding-bottom: 15px; 
        gap: 0.8rem; /* 增加书本之间的间距 */
    }
    
    /* 书本卡片 - 2D */
    .book-card-item { 
        flex-shrink: 0; 
        /* <<<<<<< 修改点2: 精确计算宽度以适配一行3本，并增加弹性 >>>>>>> */
        /* (100% / 3) - 间距。例如，3本，每本宽度约30%，剩余10%给gap */
        width: calc(33.33% - 1.6rem); /* 假设左右间距各0.8rem */
        max-width: 120px; /* 限制手机端最大宽度 */
        height: 180px; 
        margin-bottom: 0px; 
        cursor: pointer;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        z-index: 20; 
        position: relative; 
    }

    .book-card-item:hover {
        transform: translateY(-8px) scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); 
    }
    
    /* 书本封面容器 - 2D */
    .book-cover-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 0px; 
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
        border-radius: 0px; 
    }
    
    /* 书籍两边不再需要 3D 侧边 */
    .book-cover-wrapper::before,
    .book-cover-wrapper::after {
        content: none; 
    }
    
    /* 书名在封面上显示 (依然隐藏) */
    .book-title-overlay {
        display: none; 
    }

    /* 移除观看记录图标 */
    .book-card-item .recent-icon, 
    .book-card-item .history-indicator, 
    .book-cover-wrapper > svg, 
    .book-cover-wrapper > i {
        display: none !important;
    }
    
    /* 书架木板的容器 - 2D */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px; /* 木板厚度 */
        /* <<<<<<< 修改点3: 确保 muban.jpg 加载和显示 >>>>>>> */
        background-image: url('/images/muban.jpg') !important; /* 使用你的底板图片，加 !important 确保覆盖 */
        background-size: cover !important; 
        background-repeat: no-repeat !important;
        background-position: center !important;
        /* <<<<<<< 修改点4: 加强底板阴影 >>>>>>> */
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8), /* 更深更大的底部阴影 */
                    inset 0 2px 5px rgba(255,255,255,0.2), /* 顶部内阴影模拟厚度 */
                    inset 0 -2px 5px rgba(0,0,0,0.5); /* 底部内阴影模拟厚度 */
        border-radius: 2px; 
        z-index: 10;
        border-top: 2px solid rgba(255,255,255,0.2); 
        border-bottom: 2px solid rgba(0,0,0,0.4); 
    }

    /* 移除 shelf-plank 的伪元素 */
    .shelf-plank::before,
    .shelf-plank::after {
        content: none;
    }
    
    /* 响应式调整 - 手机端 */
    @media (max-width: 640px) { 
        .bookshelf-main-container { 
            padding: 3rem 0.5rem 2rem 0.5rem; 
            margin: 0.2rem; 
        } 
        .shelf-row { 
            margin-bottom: 2.5rem; 
            padding-top: 0.8rem;
            min-height: 12rem;
            padding-bottom: 12px; 
            gap: 0.5rem; /* 手机端更小的书籍间距 */
        }
        .book-card-item {
            width: calc(33.33% - 1rem); /* 手机端一行3本，更小的间距 */
            max-width: 100px; 
            height: 150px; 
            margin-bottom: 0; 
        }
        .book-card-item:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
        }
        .shelf-plank { height: 15px; } 
    }

    /* 电脑端 */
    @media (min-width: 641px) {
        .bookshelf-main-container { padding: 5rem 2rem 4rem 2rem; }
        .shelf-row {
            margin-bottom: 4rem;
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 18px; 
            gap: 1.5rem; /* 电脑端更大的书籍间距 */
        }
        .book-card-item {
            width: calc(33.33% - 3rem); /* 电脑端一行3本，更大间距 */
            max-width: 180px; 
            height: 270px; 
            margin-bottom: 0;
        }
    }
  `}</style>)
}
