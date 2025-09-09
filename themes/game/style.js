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
      background-color: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 1;
    }
    #wrapper, .top-app-bar, #footer-container {
      position: relative;
      z-index: 2;
    }

    /* 顶栏 - 回归原始风格 */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-color: rgba(10, 10, 10, 0.6);
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        color: #EAEAEA;
        font-weight: bold;
    }
    .top-app-bar .title {
      font-size: 1.25rem;
    }
    .top-app-bar .subtitle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    /*
    ============================================================
    【【【 视觉最终版 2：书本、底板立体感与空间感 】】】
    ============================================================
    */
    .bookshelf-main-container {
        padding-top: 3rem; /* 增加第一排书的顶部空间 */
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
        max-width: 150px; /* 让书本更矮、更精致 */
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

    /* 搜索模态框样式 */
    /* ... (保持您原始项目中的搜索框样式不变) ... */
    
  `}</style>)
}
