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
    【 视觉最终版 1：背景图 & 磨砂玻璃效果 】
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
      background-color: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1;
    }
    #wrapper, .top-app-bar, #footer-container, .main-search-bar {
      position: relative;
      z-index: 2;
    }

    /*
    ============================================================
    【 视觉最终版 2：顶栏美化 】
    ============================================================
    */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-color: rgba(10, 10, 10, 0.6);
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
    .top-app-bar .search-button {
      font-size: 1.25rem;
      position: absolute;
      right: 1rem;
    }
    .top-app-bar .center-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
        font-size: 1.25rem;
    }

    /* 主页搜索框 */
    .main-search-bar {
      padding: 1rem;
      background-color: transparent;
      position: sticky;
      top: 57px; /* 假设顶栏高度 */
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
    【 视觉最终版 3：书本、底板立体感与空间感 】
    ============================================================
    */
    .bookshelf-main-container {
        padding-top: 3rem;
    }
    .shelf-row {
        position: relative;
        margin-bottom: 4rem;
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 15px;
        perspective: 3000px;
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 2.5rem;
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 2.5rem);
        max-width: 150px;
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
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
    
    /* 底板立体感 */
    .shelf-plank {
        position: absolute;
        bottom: 10px;
        left: 2.5%;
        width: 95%;
        height: 12px;
        background-image: url('/images/muban.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 6px;
        z-index: 10;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    .shelf-plank::before {
      content: '';
      position: absolute;
      top: -6px; left: 0; width: 100%; height: 6px;
      background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
      border-radius: 6px 6px 0 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .shelf-plank::after {
      content: '';
      position: absolute;
      bottom: -10px; left: 0; width: 100%; height: 10px;
      background-color: #000;
      filter: blur(8px);
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
