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
    body { -webkit-tap-highlight-color: transparent; }

    /*
    ============================================================
    【【【 视觉最终版 1：背景图 & 磨砂玻璃效果 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg');
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      position: relative;
    }
    #theme-game::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.25); /* 稍微加深蒙版 */
      backdrop-filter: blur(8px); /* 磨砂效果 */
      -webkit-backdrop-filter: blur(8px);
      z-index: 1;
    }
    #wrapper, .top-app-bar, #footer-container, .main-search-bar {
      position: relative;
      z-index: 2;
    }

    /*
    ============================================================
    【【【 视觉最终版 2：顶栏美化 】】】
    ============================================================
    */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-color: rgba(10, 10, 10, 0.6); /* 更深邃的半透明背景 */
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        color: #EAEAEA;
    }
    .top-app-bar::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
    }
    .top-app-bar .title {
      font-size: 1.25rem;
      font-weight: bold;
    }
    /* 关键：将搜索图标从右侧向左移动一点 */
    .top-app-bar .search-button {
      font-size: 1.25rem;
      position: absolute;
      right: 1rem; /* 调整右边距 */
    }
     .top-app-bar .center-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }


    /* 主页搜索框 - 样式微调 */
    .main-search-bar {
      padding: 1rem;
      background-color: transparent; /* 背景透明，融入整体 */
      position: sticky;
      top: 57px; /* 紧随顶栏 */
      z-index: 40;
    }
    .main-search-input-wrapper {
        position: relative; display: flex; align-items: center;
        background-color: rgba(0,0,0,0.2); 
        border-radius: 25px; 
        padding: 0.7rem 1.2rem;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .main-search-input-wrapper .search-icon { color: #ccc; margin-right: 0.8rem; }
    .main-search-input-wrapper input {
        width: 100%; background: transparent; border: none; outline: none;
        font-size: 1rem; color: #fff;
    }
    .main-search-input-wrapper input::placeholder { color: #bbb; }

    /*
    ============================================================
    【【【 视觉最终版 3：书本、底板立体感与空间感 】】】
    ============================================================
    */
    .bookshelf-main-container {
        padding-top: 3rem; /* 关键：增加第一排书的顶部空间 */
    }
    .shelf-row {
        position: relative;
        margin-bottom: 4rem; /* 增大行间距 */
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 15px; /* 为底板和阴影留出空间 */
        perspective: 3000px;
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 2.5rem; /* 调整间距以适应3D效果 */
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 2.5rem);
        max-width: 150px; /* 关键：让书本更矮、更精致 */
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
        /* 关键：更高的倾斜度 */
        transform: rotateY(40deg); 
        transform-origin: center right;
    }
    .book-card-item:hover {
        transform: rotateY(30deg) scale(1.05) translateY(-12px);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260;
        box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        border-radius: 4px;
        overflow: hidden;
    }
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
    }
    
    /* 关键：底板立体感 */
    .shelf-plank {
        position: absolute;
        bottom: 10px;
        left: 2.5%; /* 两端留空 */
        width: 95%; /* 两端留空 */
        height: 12px; /* 板面厚度 */
        background-image: url('/images/muban.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 6px;
        z-index: 10;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    /* 模拟板面厚度与高光 */
    .shelf-plank::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 0;
      width: 100%;
      height: 6px;
      background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
      border-radius: 6px 6px 0 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    /* 关键：底部的粗黑线阴影 */
    .shelf-plank::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 10px; /* 增加黑线粗细 */
      background-color: #000;
      filter: blur(8px); /* 调整模糊度 */
    }

    /* 移动端兼容性处理 */
    @media (max-width: 640px) {
      .book-card-item {
        transform: none !important; 
      }
      .book-card-item:hover {
        transform: translateY(-8px) !important;
      }
      .books-on-shelf {
        gap: 1rem;
      }
      .book-card-item { 
        max-width: 120px;
      }
    }
    
  `}</style>)
}
