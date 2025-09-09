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
    html, body {
        overflow-x: hidden;
    }
    body { -webkit-tap-highlight-color: transparent; }

    /*
    ============================================================
    【【【 视觉优化版 1：背景、光影与布局 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.png');
      background-size: cover;
      background-attachment: scroll; 
      background-position: center;
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      position: relative;
    }

    /* 全局光照效果 */
    #theme-game::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 20% 20%, rgba(255, 245, 230, 0.25) 0%, rgba(255, 255, 255, 0) 50%);
        z-index: 1;
        pointer-events: none;
    }

    /* 顶部和底部导航栏样式 - 保持不变 */
    .top-app-bar, .footer-container {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-image: url('/images/wood-texture.jpg');
        background-size: cover; background-position: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border-bottom: 2px solid rgba(0,0,0,0.3);
        color: #FFFFFF; font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #FFFFFF; }
    .footer-container {
        position: static; border-bottom: none; border-top: 2px solid rgba(0,0,0,0.3);
        box-shadow: 0 -4px 12px rgba(0,0,0,0.5);
    }
    .footer-container a, .footer-container i {
        color: #FFFFFF !important; font-weight: bold !important;
    }


    /*
    ============================================================
    【【【 视觉优化版 2：书本立体效果（核心修改） 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 3.5rem;
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 15px;
        z-index: 5;
        perspective: 2000px;
    }

    .shelf-row:first-of-type { margin-top: 4rem; }
    
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 1.5rem; padding: 0 1.5rem; width: 100%;
    }
    
    .book-card-item { 
        position: relative;
        width: calc(33.33% - 1.5rem); 
        max-width: 150px;
        z-index: 20;
        transition: transform 0.35s ease-out;
        transform-style: preserve-3d;
        
        /* 【核心修正】加入 rotateY 来创建正确的透视效果 */
        transform: rotateX(0.1deg) rotateY(3deg) rotateZ(0.6deg);
    }

    .book-card-item:hover {
        /* 悬停时，所有角度恢复为0，让书本完全“正”对我们 */
        transform: translateY(-20px) scale(1.08) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        z-index: 30;
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 3 / 4;
        position: relative;
        transform-style: preserve-3d;
        box-shadow: inset 4px 0 6px -3px rgba(0,0,0,0.55);
        border-radius: 5px 3px 3px 5px;
    }
    
    .book-cover-wrapper::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 16px; 
        background: linear-gradient(to right, #e8e8e8, #ffffff, #f0f0f0);
        border-top-left-radius: 7px;
        transform-origin: bottom;
        transform: translateY(-16px) rotateX(90deg);
    }
    
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: inherit;
        filter: drop-shadow(-6px 8px 12px rgba(0,0,0,0.45)) 
                drop-shadow(-8px 2px 5px rgba(0,0,0,0.5)); 
        transition: filter 0.3s ease-out;
    }

    .book-card-item:hover .book-cover-wrapper img {
      filter: drop-shadow(-10px 14px 20px rgba(0,0,0,0.4))
              drop-shadow(-12px 4px 8px rgba(0,0,0,0.45));
    }
    
    /*
    ============================================================
    【【【 视觉优化版 3：底板与护栏细节 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute; bottom: 0; 
        left: 5%; width: 90%; height: 15px; 
        background-image: url('/images/muban.jpg');
        background-size: cover; background-position: center;
        border-radius: 3px; z-index: 10;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
    
    /* 护栏样式 */
    .shelf-row::before {
        content: ''; 
        position: absolute;
        bottom: 10px; 
        left: 7%; 
        width: 86%; 
        height: 8px;
        background-image: url('/images/muban.jpg'); /* <-- 这里是护栏图片 */
        background-size: cover;
        background-position: center;
        border-radius: 2px; 
        z-index: 25; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }

    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -8px; left: 0; width: 100%; 
      height: 15px; background: transparent;
      box-shadow: 0 10px 20px 8px rgba(0, 0, 0, 0.8);
      filter: blur(12px); z-index: -1;
    }

    /* 搜索模态框样式 - 保持不变 */
    /* ... (此处样式保持不变) ... */
    .search-modal-overlay { position: fixed; inset: 0; z-index: 100; background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); display: flex; flex-direction: column; }
    .search-modal-content { width: 100%; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 4px 20px rgba(0,0,0,0.2); border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; padding: 1rem; }
    .search-modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; }
    .search-modal-header .title { font-size: 1.25rem; font-weight: 700; color: #333; }
    .search-modal-header .close-button { padding: 0.5rem; border-radius: 50%; background-color: rgba(0,0,0,0.05); color: #666; }
    .search-input-wrapper { position: relative; display: flex; align-items: center; background-color: rgba(0,0,0,0.05); border-radius: 25px; padding: 0.6rem 1rem; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); }
    .search-input-wrapper .search-icon { color: #888; margin-right: 0.8rem; }
    .search-input-wrapper input { flex-grow: 1; background: transparent; border: none; outline: none; font-size: 1rem; color: #333; }
    .search-input-wrapper .clear-button { padding: 0.3rem; border-radius: 50%; color: #888; }
    .search-input-results { flex-grow: 1; overflow-y: auto; padding-top: 1rem; }
  `}</style>)
}
