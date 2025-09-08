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
        animation-fill-fill: both
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

    /* <<<<<<< TOP APP BAR - 顶部导航栏美化为木板 >>>>>>> */
    .top-app-bar {
        position: sticky; /* 或者 fixed */
        top: 0;
        left: 0;
        right: 0;
        z-index: 50; 
        background: 
            linear-gradient(135deg, #503010 0%, #705020 20%, #503010 40%, #705020 60%, #503010 80%, #705020 100%), 
            repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.15) 0px, 
                rgba(0,0,0,0.15) 1px,
                transparent 1px,
                transparent 3px
            ), 
            repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.08) 0px, 
                rgba(0,0,0,0.08) 1px,
                transparent 1px,
                transparent 5px
            ); 
        background-color: #604020; /* fallback颜色 */
        background-blend-mode: multiply; 
        background-size: 100% 100%, 20px 20px, 30px 30px; 
        background-position: 0 0;
        
        box-shadow: 0 5px 15px rgba(0,0,0,0.4); /* 底部柔和阴影 */
        border-bottom-left-radius: 8px; 
        border-bottom-right-radius: 8px;
        padding: 0.8rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 100%; 
        margin: 0 auto;
    }

    .top-app-bar .title {
        font-size: 1.25rem; 
        font-weight: 700;
        color: #EEE; /* 文字颜色调整为浅色，与深色木纹背景形成对比 */
    }

    .top-app-bar .subtitle {
        font-size: 0.8rem;
        color: #CCC; /* 副标题颜色也调整 */
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    .top-app-bar .subtitle .flag-icon {
        font-size: 1rem; 
    }

    .top-app-bar .search-button {
        padding: 0.5rem;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.1); /* 按钮背景更透明 */
        color: #EEE; /* 按钮图标颜色调整 */
        transition: all 0.2s ease-in-out;
    }
    .top-app-bar .search-button:active {
        background-color: rgba(255,255,255,0.2);
        transform: scale(0.95);
    }

    /* 搜索模态框样式 */
    .search-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.4); 
        backdrop-filter: blur(15px); 
        -webkit-backdrop-filter: blur(15px);
        display: flex;
        flex-direction: column;
        animation: fadeIn 0.3s ease-out; 
    }

    .search-modal-content {
        width: 100%;
        background: rgba(255, 255, 255, 0.85); 
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        padding: 1rem;
    }

    .search-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
    }
    .search-modal-header .title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #333;
    }
    .search-modal-header .close-button {
        padding: 0.5rem;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.05);
        color: #666;
        transition: all 0.2s ease-in-out;
    }
    .search-modal-header .close-button:active {
        background-color: rgba(0,0,0,0.15);
        transform: scale(0.9);
    }

    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,0.05); 
        border-radius: 25px; 
        padding: 0.6rem 1rem;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); 
        transition: box-shadow 0.2s ease-in-out;
    }
    .search-input-wrapper:focus-within {
        box-shadow: inset 0 1px 5px rgba(0,0,0,0.15), 0 0 0 2px rgba(96,165,250,0.5); 
    }
    .search-input-wrapper .search-icon {
        color: #888;
        margin-right: 0.8rem;
    }
    .search-input-wrapper input {
        flex-grow: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        color: #333;
    }
    .search-input-wrapper input::placeholder {
        color: #A0A0A0;
    }
    .search-input-wrapper .clear-button {
        padding: 0.3rem;
        border-radius: 50%;
        background-color: transparent;
        color: #888;
        transition: background-color 0.2s ease-in-out;
    }
    .search-input-wrapper .clear-button:active {
        background-color: rgba(0,0,0,0.1);
    }
    .search-input-results {
        flex-grow: 1; 
        overflow-y: auto;
        padding: 1rem;
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
        margin-bottom: 1.5rem; /* 上下两层间距 */
        padding-top: 1rem; 
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        align-items: flex-end; 
        min-height: 15rem; 
        padding-bottom: 15px; 
        gap: 0.4rem; /* 书本之间默认水平和垂直间距 */
    }

    /* 放置书本的容器 */
    .books-on-shelf {
        display: flex; 
        flex-wrap: wrap; 
        justify-content: space-evenly; 
        align-items: flex-end; 
        width: 100%; 
        gap: 0.4rem; /* 放置书本容器内部间距 */
    }
    
    /* 书本卡片 */
    .book-card-item { 
        flex-shrink: 0; 
        /* 16开比例约 1.303 (高/宽) */
        flex-basis: calc(33.33% - 0.6rem); /* 确保一行3本，减去更小的间距 */
        max-width: 150px; /* 增加手机端最大宽度 */
        width: 150px; /* 强制宽度，防止变窄 */
        height: calc(150px * 1.303); /* 高度按比例计算 */
        margin-bottom: 0px; 
        cursor: pointer;
        /* <<<<<<< 优化1: 恢复 transform 动画，移除默认倾斜，由 JS 随机倾斜控制 >>>>>>> */
        transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        z-index: 20; 
        position: relative; 
        /* transform 由 JS 控制，这里不设置默认值 */
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
        /* <<<<<<< 优化2: 封面圆角，仅右侧边缘圆角 >>>>>>> */
        border-radius: 0 4px 4px 0; /* 顶部右侧和底部右侧圆角 */
        overflow: hidden;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.9), 
                    0 4px 10px rgba(0, 0, 0, 0.5), 
                    inset 0 0 5px rgba(255, 255, 255, 0.1); 
        display: flex; 
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
        /* <<<<<<< 优化3: 确保图片本身也有相同的圆角 >>>>>>> */
        border-radius: 0 4px 4px 0; /* 与容器一致 */
    }
    
    /* 书籍两边不再需要复杂的 3D 侧边 (保持移除) */
    .book-cover-wrapper::before,
    .book-cover-wrapper::after {
        content: none; 
    }
    
    /* 书名在封面上显示 (依然隐藏) */
    .book-title-overlay {
        display: none; 
    }

    /* 移除观看记录图标 (保持移除) */
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
        height: 20px; 
        background: 
            linear-gradient(135deg, #503010 0%, #705020 20%, #503010 40%, #705020 60%, #503010 80%, #705020 100%), 
            repeating-linear-gradient(
                90deg,
                rgba(0,0,0,0.15) 0px, 
                rgba(0,0,0,0.15) 1px,
                transparent 1px,
                transparent 3px
            ), 
            repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.08) 0px, 
                rgba(0,0,0,0.08) 1px,
                transparent 1px,
                transparent 5px
            ); 
        background-color: #604020; 
        background-blend-mode: multiply; 
        background-size: 100% 100%, 20px 20px, 30px 30px; 
        background-position: 0 0;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.98), 
                    inset /* <<<<<<< 优化4: 修正错误的 inset 语法 >>>>>>> */ 0 5px 12px rgba(255,255,255,0.5), 
                    inset 0 -5px 12px rgba(0,0,0,0.8); 
        border-radius: 4px; 
        z-index: 10;
        border-top: 4px solid rgba(255,255,255,0.5); 
        border-bottom: 4px solid rgba(0,0,0,0.7); 
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
            margin-bottom: 1rem; 
            padding-top: 0.8rem;
            min-height: 12rem;
            padding-bottom: 12px; 
            gap: 0.2rem; 
        }
        .books-on-shelf {
            gap: 0.2rem; 
        }
        .book-card-item {
            flex-basis: calc(33.33% - 0.4rem); 
            max-width: 105px; 
            width: 105px;
            height: calc(105px * 1.303); 
            margin-bottom: 0; 
        }
        .book-card-item:active {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8), 
                        0 2px 5px rgba(0, 0, 0, 0.4); 
        }
        .book-cover-wrapper {
            /* <<<<<<< 修改点5: 手机端封面圆角 >>>>>>> */
            border-radius: 0 4px 4px 0; 
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8), 
                        0 2px 5px rgba(0, 0, 0, 0.4); 
        }
        .book-cover-wrapper img {
            /* <<<<<<< 修改点6: 手机端图片圆角 >>>>>>> */
            border-radius: 0 4px 4px 0; 
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
            margin-bottom: 1.5rem; 
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 18px; 
            gap: 0.8rem; 
        }
        .books-on-shelf {
            gap: 0.8rem; 
        }
        .book-card-item {
            flex-basis: calc(33.33% - 1.2rem); 
            max-width: 190px; 
            width: 190px; 
            height: calc(190px * 1.303); 
            margin-bottom: 0;
        }
        .book-cover-wrapper {
            /* <<<<<<< 修改点7: 电脑端封面圆角 >>>>>>> */
            border-radius: 0 4px 4px 0; 
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9), 
                        0 5px 12px rgba(0, 0, 0, 0.7); 
        }
        .book-cover-wrapper img {
            /* <<<<<<< 修改点8: 电脑端图片圆角 >>>>>>> */
            border-radius: 0 4px 4px 0; 
        }
        .shelf-plank {
            border-radius: 4px;
        }
    }
    
    /* 动画定义 */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
  `}</style>)
}
