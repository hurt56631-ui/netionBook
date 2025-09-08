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


    /* --- 新的 2D 书架和书本样式 (针对手机优化) --- */

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
        min-height: 100vh;
        padding: 4rem 1rem 3rem 1rem; /* 整体内边距 */
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); /* 整体内阴影 */
        background-color: rgba(255, 255, 255, 0.1); /* 半透明白色，透出模糊背景 */
        -webkit-backdrop-filter: blur(5px); /* 区域模糊 */
        backdrop-filter: blur(5px);
        border-radius: 8px; /* 区域圆角 */
        margin: 0.5rem; 
        overflow: hidden; 
    }
    
    /* 单个书架行 */
    .shelf-row {
        position: relative;
        margin-bottom: 2.5rem; /* <<<<<<< 修改点1: 减小上下两层间距 >>>>>>> */
        padding-top: 1rem; 
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; /* 均匀分布书籍 */
        align-items: flex-end; /* 书本底部对齐 */
        min-height: 15rem; /* 确保有足够空间放书和底板 */
        padding-bottom: 15px; /* 为木板留出空间 */
        gap: 1rem; /* 书本之间的水平和垂直间距 */
    }

    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        align-items: flex-end; 
        width: 100%; 
        gap: 1rem; /* 书本之间的间距 */
    }
    
    /* 书本卡片 */
    .book-card-item { 
        flex-shrink: 0; 
        /* <<<<<<< 修改点2: 重新计算宽度以适配一行3本，并调整尺寸 >>>>>>> */
        flex-basis: calc(33.33% - 1.5rem); /* 让3本书占据约1/3空间，减去间距 */
        max-width: 120px; /* 限制书籍最大宽度 */
        height: 180px; /* 保持2:3比例 */
        margin-bottom: 0px; 
        cursor: pointer;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        z-index: 20; 
        position: relative; 
    }

    /* 触摸反馈（替代hover）*/
    .book-card-item:active { /* 手机端触摸时触发 */
        transform: translateY(-5px) scale(1.03); /* 轻微上浮和放大 */
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); /* 调整阴影 */
    }
    
    /* 书本封面容器 */
    .book-cover-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 4px; /* <<<<<<< 修改点3: 封面带一小点圆角 >>>>>>> */
        overflow: hidden;
        /* <<<<<<< 修改点4: 封面阴影，模拟书籍在书架上的自然投影 >>>>>>> */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), /* 底部阴影 */
                    inset 0 0 5px rgba(255, 255, 255, 0.1); /* 顶部轻微高光内阴影 */
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 确保图片覆盖且不被拉伸，解决变窄问题 */
        border-radius: 4px; /* 确保图片本身也有圆角 */
    }
    
    /* 书籍两边不再需要复杂的 3D 侧边 */
    .book-cover-wrapper::before,
    .book-cover-wrapper::after {
        content: none; /* 移除 3D 书脊和书页侧边 */
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
    
    /* 书架木板的容器 (纯 CSS 渲染) */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px; /* 木板厚度 */
        /* <<<<<<< 修改点5: 纯 CSS 渲染逼真木纹底板，放弃图片 >>>>>>> */
        background: 
            linear-gradient(135deg, #604020 0%, #806030 20%, #604020 40%, #806030 60%, #604020 80%, #806030 100%), /* 主要木纹颜色渐变 */
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
        background-color: #705030; /* fallback颜色 */
        background-blend-mode: multiply; /* 混合模式让纹理更自然 */
        background-size: 100% 100%, 20px 20px, 30px 30px; /* 调整纹理大小 */
        background-position: 0 0;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.95), /* 更深更大的底部阴影 */
                    inset 0 4px 10px rgba(255,255,255,0.4), /* 顶部高光内阴影 */
                    inset 0 -4px 10px rgba(0,0,0,0.7); /* 底部深色内阴影 */
        border-radius: 4px; /* 木板圆角与封面一致 */
        z-index: 10;
        border-top: 3px solid rgba(255,255,255,0.4); /* 顶部高光更亮更厚 */
        border-bottom: 3px solid rgba(0,0,0,0.6); /* 底部边框更深更厚 */
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
            margin-bottom: 2rem; /* 手机端减小行间距 */
            padding-top: 0.8rem;
            min-height: 12rem;
            padding-bottom: 12px; 
            gap: 0.8rem; /* 手机端书籍间距 */
        }
        .books-on-shelf {
            gap: 0.8rem; /* 手机端书籍之间的间距 */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 0.8rem); /* 手机端每本书占据1/3空间，减去间距 */
            max-width: 90px; 
            height: 135px; 
            margin-bottom: 0; 
        }
        .book-card-item:active {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        }
        .book-cover-wrapper {
            border-radius: 4px;
        }
        .book-cover-wrapper img {
            border-radius: 4px;
        }
        .shelf-plank { 
            height: 15px; 
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.9), 
                        inset 0 2px 5px rgba(255,255,255,0.3), 
                        inset 0 -2px 5px rgba(0,0,0,0.6);
            border-top: 2px solid rgba(255,255,255,0.4); 
            border-bottom: 2px solid rgba(0,0,0,0.6); 
            border-radius: 4px;
        } 
    }

    /* 电脑端 */
    @media (min-width: 641px) {
        .bookshelf-main-container { padding: 5rem 2rem 4rem 2rem; }
        .shelf-row {
            margin-bottom: 3rem; /* 电脑端减小行间距 */
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 18px; 
            gap: 1.5rem; /* 电脑端书籍间距 */
        }
        .books-on-shelf {
            gap: 1.5rem; /* 电脑端书籍之间的间距 */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 1.5rem); /* 电脑端每本书占据1/3空间，减去间距 */
            max-width: 150px; 
            height: 225px; 
            margin-bottom: 0;
        }
        .book-cover-wrapper {
            border-radius: 4px;
        }
        .book-cover-wrapper img {
            border-radius: 4px;
        }
        .shelf-plank {
            border-radius: 4px;
        }
    }
  `}</style>)
}
