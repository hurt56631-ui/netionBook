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
        padding: 4rem 1rem 3rem 1rem; /* 整体内边距，手机友好 */
        box-shadow: inset 0 0 80px rgba(0,0,0,0.9); /* 整体内阴影，增加深度 */
    }
    
    /* 单个书架行 - 2D */
    .shelf-row {
        position: relative;
        margin-bottom: 3rem; /* 每层书架之间的垂直间距 */
        padding-top: 1rem; /* 书本上方留一些空间 */
        display: flex; /* 让书籍在行内平铺 */
        flex-wrap: wrap; /* 允许书籍换行 */
        justify-content: space-evenly; /* 均匀分布书籍 */
        align-items: flex-start; /* 书本顶部对齐 */
        min-height: 15rem; /* 确保有足够空间放书和底板 */
        padding-bottom: 10px; /* 为木板留出空间 */
    }
    
    /* 书本卡片 - 2D */
    .book-card-item { 
        flex-shrink: 0; 
        width: 120px; /* 手机端书籍宽度 */
        height: 180px; /* 保持2:3比例 */
        margin-bottom: 1.5rem; /* 书本之间的垂直间距 */
        cursor: pointer;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        z-index: 20; /* 确保书籍在底板之上 */
        position: relative; /* 用于阴影 */
    }

    .book-card-item:hover {
        transform: translateY(-8px) scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* Hover 阴影 */
    }
    
    /* 书本封面容器 - 2D */
    .book-cover-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 0px; /* << 修改点: 直角封面 */
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 封面阴影 */
        display: flex; /* 让图片在容器内居中 */
        justify-content: center;
        align-items: center;
    }
    
    .book-cover-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 确保图片覆盖 */
        border-radius: 0px; /* << 修改点: 确保图片本身也是直角 */
    }
    
    /* 书籍两边不再需要 3D 侧边 */
    .book-cover-wrapper::before,
    .book-cover-wrapper::after {
        content: none; /* 移除 3D 书脊和书页侧边 */
    }
    
    /* 书名在封面上显示 (依然隐藏) */
    .book-title-overlay {
        display: none; 
    }
    
    /* 书架木板的容器 - 2D */
    .shelf-plank {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px; /* 木板厚度 */
        background-image: url('/images/muban.jpg'); /* << 修改点: 使用你的底板图片 */
        background-size: cover; /* 确保图片覆盖 */
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: 0 5px 10px rgba(0,0,0,0.5); /* 木板下方投影 */
        border-radius: 2px; /* 木板也稍微有点圆角 */
        z-index: 10;
        /* 对于 2D 布局，不需要复杂的伪元素来模拟 3D 顶部和正面，直接用主元素即可 */
        /* 如果 muban.jpg 纹理本身需要调整，可以添加亮度或对比度滤镜 */
        /* filter: brightness(0.9) contrast(1.1); */
    }

    /* 移除 shelf-plank 的伪元素，因为 2D 布局不需要它们来模拟 3D */
    .shelf-plank::before,
    .shelf-plank::after {
        content: none;
    }
    
    /* 响应式调整 - 手机端 */
    @media (max-width: 640px) { 
        .bookshelf-main-container { padding: 3rem 0.5rem 2rem 0.5rem; } 
        .shelf-row { 
            margin-bottom: 2.5rem; /* 手机端行间距 */
            padding-top: 0.8rem;
            min-height: 12rem;
            padding-bottom: 8px;
        }
        .book-card-item {
            width: 100px; 
            height: 150px; 
            margin-bottom: 1rem;
        }
        .book-card-item:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
        }
        .shelf-plank { height: 15px; } 
    }

    /* 电脑端 (可选，如果需要和手机端不同样式) */
    @media (min-width: 641px) {
        .bookshelf-main-container { padding: 5rem 2rem 4rem 2rem; }
        .shelf-row {
            margin-bottom: 4rem;
            padding-top: 1.5rem;
            min-height: 18rem;
            padding-bottom: 15px;
        }
        .book-card-item {
            width: 150px;
            height: 225px;
            margin-bottom: 2rem;
        }
    }
  `}</style>)
}
