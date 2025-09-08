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
        padding: 4rem 1rem 3rem 1rem; 
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); 
        background-color: rgba(255, 255, 255, 0.1); 
        -webkit-backdrop-filter: blur(5px); 
        backdrop-filter: blur(5px);
        border-radius: 8px; 
        margin: 0.5rem; 
        overflow: hidden; 
    }
    
    /* 单个书架行 */
    .shelf-row {
        position: relative;
        margin-bottom: 1.8rem; /* <<<<<<< 优化1: 进一步减小上下两层间距 >>>>>>> */
        padding-top: 1rem; 
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        align-items: flex-end; 
        min-height: 15rem; 
        padding-bottom: 15px; 
        gap: 0.5rem; /* <<<<<<< 优化2: 书本之间默认水平和垂直间距更小 >>>>>>> */
    }

    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        align-items: flex-end; 
        width: 100%; 
        gap: 0.5rem; /* <<<<<<< 优化3: 放置书本容器内部间距更小 >>>>>>> */
    }
    
    /* 书本卡片 */
    .book-card-item { 
        flex-shrink: 0; 
        /* <<<<<<< 优化4: 增加书籍尺寸，并确保一行3本 >>>>>>> */
        /* 使用 flex-basis 和 max-width 结合，让其在不同屏幕尺寸下自适应，同时确保单行书籍数量 */
        flex-basis: calc(33.33% - 0.7rem); /* 3本书占据约1/3空间，减去更小的间距 (0.5rem * 2) */
        max-width: 130px; /* 增加手机端最大宽度 */
        height: 195px; /* 保持2:3比例 */
        margin-bottom: 0px; 
        cursor: pointer;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        z-index: 20; 
        position: relative; 
    }

    /* 触摸反馈（替代hover）*/
    .book-card-item:active { 
        transform: translateY(-5px) scale(1.02); 
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4); 
    }
    
    /* 书本封面容器 */
    .book-cover-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 4px; /* 封面带一小点圆角 */
        overflow: hidden;
        /* <<<<<<< 优化5: 封面阴影更深更大，模拟书籍从背景中浮出 >>>>>>> */
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9), /* 极深的底部阴影 */
                    0 3px 8px rgba(0, 0, 0, 0.5), /* 顶部和两侧更柔和的阴影，模拟光线 */
                    inset 0 0 5px rgba(255, 255, 255, 0.1); /* 顶部轻微高光内阴影 */
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
        border-radius: 4px; 
    }
    
    /* 书籍两边不再需要复杂的 3D 侧边 */
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
    
    /* 书架木板的容器 (纯 CSS 渲染) */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px; /* 木板厚度 */
        /* <<<<<<< 优化6: 纯 CSS 渲染逼真木纹底板，放弃图片，并优化颜色和纹理 >>>>>>> */
        background: 
            linear-gradient(135deg, #503010 0%, #705020 20%, #503010 40%, #705020 60%, #503010 80%, #705020 100%), /* 调整木纹颜色，更深更暖 */
            repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.15) 0px, /* 细微划痕更明显 */
                rgba(0,0,0,0.15) 1px,
                transparent 1px,
                transparent 3px
            ), 
            repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.08) 0px, /* 垂直纹理更明显 */
                rgba(0,0,0,0.08) 1px,
                transparent 1px,
                transparent 5px
            ); 
        background-color: #604020; /* 更深的fallback颜色 */
        background-blend-mode: multiply; 
        background-size: 100% 100%, 20px 20px, 30px 30px; 
        background-position: 0 0;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.98), /* 更深更广的底部阴影 */
                    inset 0 5px 12px rgba(255,255,255,0.5), /* 顶部高光内阴影更亮更厚 */
                    inset 0 -5px 12px rgba(0,0,0,0.8); /* 底部深色内阴影更深更厚 */
        border-radius: 4px; 
        z-index: 10;
        border-top: 4px solid rgba(255,255,255,0.5); /* 顶部高光更亮更厚 */
        border-bottom: 4px solid rgba(0,0,0,0.7); /* 底部边框更深更厚 */
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
            margin-bottom: 1.2rem; /* <<<<<<< 优化7: 手机端进一步减小行间距 >>>>>>> */
            padding-top: 0.8rem;
            min-height: 12rem;
            padding-bottom: 12px; 
            gap: 0.4rem; /* <<<<<<< 优化8: 手机端书籍间距更小，让它们挨近 >>>>>>> */
        }
        .books-on-shelf {
            gap: 0.4rem; /* <<<<<<< 优化9: 手机端书籍之间的间距更小 >>>>>>> */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 0.6rem); /* 手机端每本书占据1/3空间，减去更小的间距 */
            max-width: 105px; 
            height: 157.5px; 
            margin-bottom: 0; 
        }
        .book-card-item:active {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        }
        .book-cover-wrapper {
            border-radius: 4px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8), /* 手机端封面阴影更深更大 */
                        0 2px 5px rgba(0, 0, 0, 0.4); 
        }
        .book-cover-wrapper img {
            border-radius: 4px;
        }
        .shelf-plank { 
            height: 15px; 
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.95), 
                        inset 0 3px 8px rgba(255,255,255,0.4), 
                        inset 0 -3px 8px rgba(0,0,0,0.7);
            border-top: 3px solid rgba(255,255,255,0.5); 
            border-bottom: 3px solid rgba(0,0,0,0.7); 
            border-radius: 4px;
        } 
    }

    /* 电脑端 */
    @media (min-width: 641px) {
        .bookshelf-main-container { padding: 5rem 2rem 4rem 2rem; }
        .shelf-row {
            margin-bottom: 2rem; /* 电脑端减小行间距 */
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 18px; 
            gap: 1rem; /* 电脑端书籍间距更小 */
        }
        .books-on-shelf {
            gap: 1rem; /* 电脑端书籍之间的间距更小 */
        }
        .book-card-item {
            flex-basis: calc(33.33% - 1.5rem); /* 电脑端每本书占据1/3空间，减去更小的间距 */
            max-width: 180px; 
            height: 270px; 
            margin-bottom: 0;
        }
        .book-cover-wrapper {
            border-radius: 4px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.9), 
                        0 4px 10px rgba(0, 0, 0, 0.6); 
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
