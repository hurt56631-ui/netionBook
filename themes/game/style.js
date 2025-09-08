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
        padding: 4rem 1rem 3rem 1rem; 
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); 
        background-color: rgba(255, 255, 255, 0.1); 
        -webkit-backdrop-filter: blur(5px); 
        backdrop-filter: blur(5px);
        border-radius: 8px; 
        margin: 0.5rem; 
        overflow: hidden; 
    }
    
    /* 单个书架行 - 2D */
    .shelf-row {
        position: relative;
        margin-bottom: 3rem; 
        padding-top: 1rem; 
        display: flex; 
        flex-wrap: wrap; /* <<<<<<< 关键点1: 确保书籍可以换行 >>>>>>> */
        justify-content: space-evenly; /* <<<<<<< 关键点2: 均匀分布书籍，两侧留空 >>>>>>> */
        align-items: flex-end; 
        min-height: 15rem; 
        padding-bottom: 15px; 
        gap: 1.5rem; /* <<<<<<< 关键点3: 书本之间的水平和垂直间距 >>>>>>> */
    }

    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex; /* 让书籍在行内平铺的关键 */
        flex-wrap: wrap; /* 确保书籍可以换行 */
        justify-content: space-evenly; /* 均匀分布书籍 */
        align-items: flex-end; /* 书本底部对齐 */
        width: 100%; /* 确保占据父容器全部宽度 */
        gap: 1.5rem; /* 书本之间的间距 */
    }
    
    /* 书本卡片 - 2D */
    .book-card-item { 
        flex-shrink: 0; 
        /* <<<<<<< 关键点4: 重新计算宽度以适配一行3本，并调整尺寸 >>>>>>> */
        /* 使用 calc(100% / 3 - 间距)，让3本书加间距正好填满一行 */
        width: calc(33.33% - 1rem); /* 假设 3本书，每个0.5rem的gap，总共2个gap */
        max-width: 120px; /* 限制手机端最大宽度 */
        height: 180px; /* 保持2:3比例 */
        margin-bottom: 0px; /* 垂直间距由 shelf-row 的 gap 控制 */
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
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6); 
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 确保图片覆盖且不被拉伸，解决变窄问题 */
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
        height: 20px; 
        /* <<<<<<< 关键点5: 纯 CSS 渲染逼真木纹底板，放弃图片 >>>>>>> */
        background: 
            linear-gradient(135deg, rgba(107,79,44,1) 0%, rgba(138,108,66,1) 20%, rgba(107,79,44,1) 40%, rgba(138,108,66,1) 60%, rgba(107,79,44,1) 80%, rgba(138,108,66,1) 100%), /* 主要木纹颜色渐变 */
            repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.1) 0px,
                rgba(0,0,0,0.1) 1px,
                transparent 1px,
                transparent 3px
            ), /* 细微划痕 */
            repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.05) 0px,
                rgba(0,0,0,0.05) 1px,
                transparent 1px,
                transparent 5px
            ); /* 垂直纹理 */
        background-color: #6b4f2c; /* fallback颜色 */
        background-blend-mode: multiply; /* 混合模式让纹理更自然 */
        background-size: 100% 100%, 20px 20px, 30px 30px; /* 调整纹理大小 */
        background-position: 0 0;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.95), /* 更深更大的底部阴影 */
                    inset 0 4px 10px rgba(255,255,255,0.4), /* 顶部高光内阴影 */
                    inset 0 -4px 10px rgba(0,0,0,0.7); /* 底部深色内阴影 */
        border-radius: 2px; 
        z-index: 10;
        border-top: 3px solid rgba(255,255,255,0.4); /* 顶部高光更亮更厚 */
        border-bottom: 3px solid rgba(0,0,0,0.6); /* 底部边框更深更厚 */
    }

    /* 移除 shelf-plank 的伪元素 (不需要) */
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
            gap: 1rem; /* 手机端书籍间距 */
        }
        .books-on-shelf {
            gap: 1rem; /* 手机端书籍之间的间距 */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 1rem); /* 手机端每本书占据1/3空间，减去间距 */
            max-width: 90px; /* 手机端每本书的宽度 */
            height: 135px; /* 保持2:3比例 */
            margin-bottom: 0; 
        }
        .book-card-item:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
        }
        .shelf-plank { 
            height: 15px; 
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9), 
                        inset 0 2px 5px rgba(255,255,255,0.3), 
                        inset 0 -2px 5px rgba(0,0,0,0.6);
            border-top: 2px solid rgba(255,255,255,0.4); 
            border-bottom: 2px solid rgba(0,0,0,0.6); 
        } 
    }

    /* 电脑端 */
    @media (min-width: 641px) {
        .bookshelf-main-container { padding: 5rem 2rem 4rem 2rem; }
        .shelf-row {
            margin-bottom: 4rem;
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 18px; 
            gap: 2rem; /* 电脑端书籍间距 */
        }
        .books-on-shelf {
            gap: 2rem; /* 电脑端书籍之间的间距 */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 2rem); /* 电脑端每本书占据1/3空间，减去间距 */
            max-width: 150px; /* 电脑端每本书的固定宽度 */
            height: 225px; 
            margin-bottom: 0;
        }
    }
  `}</style>)
}
