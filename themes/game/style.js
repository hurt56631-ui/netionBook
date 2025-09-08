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
        /* 背景色在 LayoutBase 中设置 */
        min-height: 100vh;
        padding: 8rem 2rem 5rem 2rem;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); /* 整体内阴影，增加深度 */
    }
    
    /* 单个书架行（包含书本和木板） */
    .shelf-row {
        position: relative;
        margin-bottom: 4rem; 
        height: 16rem; 
    }
    
    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex;
        justify-content: center;
        align-items: flex-end; 
        gap: 1.5rem; 
        height: 100%;
        padding-bottom: 25px; 
        flex-wrap: wrap; 
    }
    
    /* 书架木板的容器 */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 25px; 
        transform-style: preserve-3d;
        perspective: 800px;
        z-index: 10;
    }
    
    /* 木板的顶部表面 (使用 muban.jpg 图片) */
    .shelf-plank::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px; /* 顶部平面的深度 */
        background-image: url('/images/muban.jpg'); /* << 修改点: 使用你的底板图片 */
        background-size: cover; /* 确保图片覆盖 */
        background-repeat: no-repeat;
        background-position: center;
        transform: rotateX(80deg) translateZ(-5px); /* 旋转并向上平移，形成顶部透视 */
        transform-origin: bottom center;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5); /* 顶部阴影 */
        border-radius: 5px;
    }
    
    /* 木板的正面 (使用 muban.jpg 图片) */
    .shelf-plank::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; /* 木板厚度 */
        background-image: url('/images/muban.jpg'); /* << 修改点: 使用你的底板图片 */
        background-size: cover; /* 确保图片覆盖 */
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.6); /* 正面下方的投影 */
        border-radius: 5px;
        border-top: 1px solid rgba(255,255,255,0.1); /* 顶部高光 */
    }
    
    /* 书本卡片 */
    .book-card-item { 
        height: 100%; 
        flex-shrink: 0; 
        display: flex;
        align-items: flex-end;
    }
    
    /* 包裹书本封面的容器，用于应用复杂的3D变换和阴影 */
    .book-cover-wrapper {
        transform-style: preserve-3d;
        transform: perspective(1000px) rotateY(-8deg) rotateX(1deg); /* 稍微减小倾斜，更自然 */
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        filter: drop-shadow(6px 10px 12px rgba(0, 0, 0, 0.6)); /* 稍微减小初始阴影 */
        position: relative;
        width: 150px; 
        height: 225px; 
        border-radius: 2px; /* << 修改点: 封面改为直角，保留一点点圆润 */
        z-index: 15; 
    }
    
    .book-cover-wrapper img {
        border-radius: 2px; /* << 修改点: 确保图片本身也有直角 */
    }
    
    .book-cover-wrapper:hover {
        transform: perspective(1000px) rotateY(-2deg) rotateX(0deg) translateY(-20px) translateZ(30px) scale(1.1);
        filter: drop-shadow(12px 20px 30px rgba(0, 0, 0, 0.8)); /* 调整 hover 阴影 */
        z-index: 50;
    }
    
    /* 书本左侧厚度（书脊） */
    .book-cover-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: -15px; /* 略微减小书脊宽度 */
        width: 15px; 
        height: 100%;
        /* << 修改点: 简化书脊样式，使用更柔和的渐变或纯色 */
        background: linear-gradient(to right, #333333 0%, #444444 50%, #333333 100%);
        box-shadow: inset -4px 0 8px rgba(0, 0, 0, 0.7); /* 调整阴影 */
        transform-origin: left;
        transform: rotateY(-70deg) translateZ(-6px); /* 调整角度和深度 */
        border-top-left-radius: 2px; /* << 修改点: 匹配封面圆角 */
        border-bottom-left-radius: 2px; /* << 修改点: 匹配封面圆角 */
        z-index: -1;
    }
    
    /* 书本右侧厚度（书页侧边） */
    .book-cover-wrapper::after {
        content: '';
        position: absolute;
        top: 0;
        right: -8px; /* 略微减小侧边厚度 */
        width: 8px; 
        height: 100%;
        /* << 修改点: 简化书页侧边样式 */
        background-color: #f7f3e8; /* 纸张颜色略亮 */
        background-image: repeating-linear-gradient(to bottom, #f7f3e8 0px, #f7f3e8 1px, #ebe7d9 1px, #ebe7d9 2px, #f7f3e8 2px, #f7f3e8 3px);
        box-shadow: inset 2px 0 6px rgba(0, 0, 0, 0.3); /* 调整阴影 */
        transform-origin: right;
        transform: rotateY(55deg) translateZ(-4px); /* 调整角度和深度 */
        border-top-right-radius: 2px; /* << 修改点: 匹配封面圆角 */
        border-bottom-right-radius: 2px; /* << 修改点: 匹配封面圆角 */
        z-index: -1; 
    }
    
    /* 书名在封面上显示 */
    .book-title-overlay {
        display: none; 
    }
    
    /* 响应式调整 - 手机端优化 */
    @media (max-width: 640px) { /* 手机 */
        .bookshelf-main-container { padding: 4rem 0.5rem 3rem 0.5rem; } /* 减少整体内边距 */
        .shelf-row { margin-bottom: 3rem; height: 12rem; } /* 进一步减小行间距和高度 */
        .books-on-shelf { 
            gap: 0.8rem; /* 书本之间更紧凑 */
            justify-content: space-evenly; /* 均匀分布书籍，可能一行3本 */
            padding-bottom: 20px; 
            overflow-x: hidden; /* 防止溢出导致水平滚动条 */
        }
        .book-card-item {
            flex: 0 0 calc(33.33% - 0.8rem); /* 尝试让一行显示3本书 */
            max-width: calc(33.33% - 0.8rem);
        }
        .book-cover-wrapper { 
            width: 100%; 
            height: 150px; /* 调整手机端的书籍高度，适应屏幕 */
            transform: perspective(800px) rotateY(-5deg) rotateX(0deg); /* 手机端减少3D倾斜，更直接 */
            filter: drop-shadow(4px 8px 10px rgba(0, 0, 0, 0.5)); /* 调整手机端阴影 */
            border-radius: 2px; 
        }
        .book-cover-wrapper img {
            border-radius: 2px;
        }
        .book-cover-wrapper:hover {
            transform: perspective(800px) rotateY(-2deg) translateY(-10px) scale(1.05); /* 手机端 hover 效果也简化 */
            filter: drop-shadow(8px 15px 20px rgba(0, 0, 0, 0.7));
        }
        .shelf-plank { height: 20px; } /* 手机端木板厚度略微减小 */
        .shelf-plank::before { height: 40px; transform: rotateX(75deg) translateZ(-3px); } /* 调整手机端木板透视 */
        .book-cover-wrapper::before { left: -10px; width: 10px; transform: rotateY(-65deg) translateZ(-4px); border-radius: 2px; }
        .book-cover-wrapper::after { right: -6px; width: 6px; transform: rotateY(50deg) translateZ(-3px); border-radius: 2px; }
    }
  `}</style>)
}
