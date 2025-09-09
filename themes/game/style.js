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
    【【【 视觉优化版 1：背景、顶栏/底板样式与布局 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg');
      background-size: cover;
      background-attachment: scroll; 
      background-position: center;
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }

    /* 顶部导航栏 (顶板) - 保持不变 */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-image: url('/images/wood-texture.jpg');
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border-bottom: 2px solid rgba(0,0,0,0.3);
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #FFFFFF; }

    /* 底部导航栏 (Footer) 样式 - 保持不变 */
    .footer-container {
        background-image: url('/images/muban.jpg');
        background-size: cover;
        background-position: center;
        box-shadow: 0 -4px 12px rgba(0,0,0,0.5);
        border-top: 2px solid rgba(0,0,0,0.3);
        padding: 1rem;
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .footer-container a, .footer-container i {
        color: #FFFFFF !important;
        font-weight: bold !important;
    }


    /*
    ============================================================
    【【【 视觉优化版 2：书本尺寸、位置、阴影与细节 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 3.5rem;
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 15px; /* 调整数值以匹配更薄的底板 */
    }

    /* 【用户反馈修订】为第一排书架增加顶部空间，远离顶栏 */
    .shelf-row:first-of-type {
        margin-top: 4rem; /* 显著增加与顶部导航栏的距离 */
    }
    
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 1.5rem; /* 稍微增加书本间隙 */
        /* 【用户反馈修订】增加左右内边距，防止书本看起来要掉下去 */
        padding: 0 1.5rem;
        width: 100%;
    }
    
    .book-card-item { 
        position: relative;
        width: calc(33.33% - 1.5rem); 
        max-width: 150px; /* 适当调整最大宽度 */
        z-index: 20;
        /* 【用户反馈修订】移除3D旋转，改用更直接的2D变换 */
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    }

    .book-card-item:hover {
        /* 【用户反馈修订】简化悬停效果为向上、放大，更稳定 */
        transform: translateY(-20px) scale(1.08);
        z-index: 30;
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 3 / 4; /* 调整为更常见的书本比例 */
        position: relative;
        /* 【用户反馈修订】增加 overflow: hidden 来配合实现折角效果 */
        overflow: hidden;
        border-radius: 3px 3px 2px 2px; /* 给书皮一个轻微的圆角 */
    }
    
    /* 【用户反馈修订】新增：左上角折角效果 */
    .book-cover-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 25px; /* 折角的大小 */
        height: 25px;
        /* 关键：通过渐变创建三角形，模拟翻开的书页颜色 */
        background: linear-gradient(135deg, #f0f0f0 0%, #dddddd 50%, transparent 50%);
        /* 关键：给折角本身加上阴影，使其有立体感 */
        box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.3);
        border-bottom-right-radius: 3px; /* 让折角的尖端也带一点圆润 */
    }
    
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: inherit; /* 继承父容器的圆角 */
        /* 【用户反馈修订】调整阴影，使其更像书本厚度产生的自然阴影 */
        filter: drop-shadow(-6px 8px 12px rgba(0,0,0,0.45)); 
        transition: filter 0.3s ease-out;
    }

    .book-card-item:hover .book-cover-wrapper img {
      /* 悬停时阴影更深更广，突出层次感 */
      filter: drop-shadow(-10px 14px 20px rgba(0,0,0,0.4));
    }
    
    /*
    ============================================================
    【【【 视觉优化版 3：底板、护栏与阴影 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute;
        bottom: 0; 
        left: 5%;
        width: 90%;
        /* 【用户反馈修订】底板改薄 */
        height: 15px; 
        background-image: url('/images/muban.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 3px;
        z-index: 10;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    }
    
    /* 【用户反馈修订】移除压条，因为新的护栏效果更好 */
    /* .shelf-plank::before { ... } */

    /* 【用户反馈修订】新增：使用 shelf-row 的伪元素来创建木条护栏 */
    .shelf-row::before {
        content: '';
        position: absolute;
        /* 定位在底板的上方和前方 */
        bottom: 10px; 
        left: 5%;
        width: 90%;
        height: 8px; /* 护栏的高度 */
        background-color: #4a382a; /* 一个比木板稍深的颜色 */
        background-image: linear-gradient(to right, rgba(255,255,255,0.1), transparent, rgba(0,0,0,0.2)); /* 模拟高光和暗部 */
        border-radius: 2px;
        /* 关键：z-index要高于书本，才能挡在书前 */
        z-index: 25; 
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }

    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -8px; 
      left: 0;
      width: 100%; 
      height: 15px; 
      background: transparent;
      /* 优化底板下方的环境阴影 */
      box-shadow: 0 10px 20px 8px rgba(0, 0, 0, 0.8);
      filter: blur(12px); 
      z-index: -1;
    }

    /* 搜索模态框样式 - 保持不变 */
    .search-modal-overlay {
        position: fixed; inset: 0; z-index: 100;
        background-color: rgba(0, 0, 0, 0.4); 
        backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
        display: flex; flex-direction: column;
    }
    .search-modal-content {
        width: 100%; background: rgba(255, 255, 255, 0.85); 
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;
        padding: 1rem;
    }
    /* ... (其余搜索样式保持不变) ... */
    .search-modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; }
    .search-modal-header .title { font-size: 1.25rem; font-weight: 700; color: #333; }
    .search-modal-header .close-button { padding: 0.5rem; border-radius: 50%; background-color: rgba(0,0,0,0.05); color: #666; }
    .search-input-wrapper {
        position: relative; display: flex; align-items: center;
        background-color: rgba(0,0,0,0.05); border-radius: 25px; 
        padding: 0.6rem 1rem; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1); 
    }
    .search-input-wrapper .search-icon { color: #888; margin-right: 0.8rem; }
    .search-input-wrapper input {
        flex-grow: 1; background: transparent; border: none;
        outline: none; font-size: 1rem; color: #333;
    }
    .search-input-wrapper .clear-button { padding: 0.3rem; border-radius: 50%; color: #888; }
    .search-input-results { flex-grow: 1; overflow-y: auto; padding-top: 1rem; }
  `}</style>)
}
