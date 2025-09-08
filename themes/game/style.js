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

    /* 背景图 & 磨砂玻璃效果 */
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
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      z-index: 1;
    }
    #wrapper, .top-app-bar, #footer-container, .main-search-bar {
      position: relative;
      z-index: 2;
    }

    /* 顶栏 */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-color: rgba(20, 20, 20, 0.5);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
        font-weight: bold;
    }

    /* 主页搜索框 */
    .main-search-bar {
      padding: 1rem;
      background-color: rgba(20, 20, 20, 0.5);
      position: sticky;
      top: 57px;
      z-index: 40;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
    .main-search-input-wrapper {
        position: relative; display: flex; align-items: center;
        background-color: rgba(255,255,255,0.1); 
        border-radius: 25px; 
        padding: 0.6rem 1rem;
        border: 1px solid rgba(255,255,255,0.2);
    }
    .main-search-input-wrapper .search-icon { color: #ccc; margin-right: 0.8rem; }
    .main-search-input-wrapper input {
        width: 100%;
        background: transparent; border: none; outline: none;
        font-size: 1rem; color: #fff;
    }
    .main-search-input-wrapper input::placeholder { color: #aaa; }

    /*
    ============================================================
    【【【 3D效果最终版：正确的透视关系 】】】
    ============================================================
    */
    .bookshelf-main-container {
        padding-top: 2rem;
    }
    .shelf-row {
        position: relative;
        margin-bottom: 3rem;
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 10px;
        perspective: 2500px; /* 设定3D舞台感 */
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 2rem; /* 调整间距以适应3D效果 */
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 2rem);
        max-width: 160px;
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
        /* 关键：正确的透视旋转！书本向左后方倾斜，左边宽右边窄 */
        transform: rotateY(30deg); 
        transform-origin: center right; /* 旋转轴心在书本的右边缘中心 */
    }
    .book-card-item:hover {
        transform: rotateY(20deg) scale(1.05) translateY(-10px);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260;
        box-shadow: 0 12px 25px rgba(0,0,0,0.5);
        border-radius: 4px;
        overflow: hidden;
    }
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
    }
    
    /* 底板立体感 */
    .shelf-plank {
        position: absolute;
        bottom: 5px;
        left: 5%;
        width: 90%;
        height: 8px;
        background-color: #252525;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    }
    .shelf-plank::before {
      content: '';
      position: absolute;
      top: -4px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #333;
      border-radius: 4px 4px 0 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .shelf-plank::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 5px;
      background-color: #000;
      filter: blur(3px);
    }

    /* 
    ============================================================
    【【【 关键：移动端兼容性处理 】】】
    ============================================================
    */
    @media (max-width: 640px) {
      .book-card-item {
        /* 在手机等小屏幕上，取消所有3D旋转，恢复直立状态 */
        transform: none !important; 
      }
      .book-card-item:hover {
        /* 保留简单的上浮效果 */
        transform: translateY(-8px) !important;
      }
      .books-on-shelf {
        gap: 1.5rem; /* 恢复较小的间距 */
      }
    }
    
  `}</style>)
}
