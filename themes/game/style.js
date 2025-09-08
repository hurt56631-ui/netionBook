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
        overflow-x: hidden; /* 避免水平滚动条 */
    }
    body { -webkit-tap-highlight-color: transparent; }

    /*
    ============================================================
    【【【 视觉最终版 1：背景图固定，顶栏/底板样式修复 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg'); /* 主背景图 */
      background-size: cover;
      background-attachment: fixed; /* 关键：背景图固定 */
      background-position: center;
      /* 确保没有模糊 */
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    /* 顶部导航栏 (顶板) */
    .top-app-bar {
        position: sticky; top: 2; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-image: url('/images/wood-texture.jpg'); /* 独立的深色木纹图 */
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border-bottom: 2px solid rgba(0,0,0,0.3);
        /* 关键：粗体白字，保证清晰度 */
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #FFFFFF; }

    /* 底部导航栏 (Footer) 样式 */
    /* 请确保您的Footer组件的根元素有 .footer-container 类名 */
    .footer-container {
        background-image: url('/images/muban.jpg'); /* 底板使用深色木纹图 */
        background-size: cover;
        background-position: center;
        box-shadow: 0 -4px 12px rgba(0,0,0,0.5); /* 向上阴影 */
        border-top: 2px solid rgba(0,0,0,0.3);
        padding: 1rem;
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .footer-container a, .footer-container i {
        color: #FFFFFF !important; /* 确保链接和图标也是白色 */
        font-weight: bold !important;
    }


    /*
    ============================================================
    【【【 视觉最终版 2：书本尺寸、间距、正确透视与阴影 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 2.5rem; /* 调整行间距 */
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 25px; /* 关键：确保书本立在底板上方 */
        perspective: 3500px; /* 增强3D舞台感 */
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 0.8rem; /* 减小书本间隙，让它们更紧凑 */
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 1.2rem); /* 调整宽度以适配间隙和总宽度 */
        max-width: 170px; /* 确保书本足够大 */
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
        
        /* 关键：正确的透视旋转！书本向右后方倾斜，左边宽右边窄 */
        transform: rotateY(35deg); /* 向负Y轴旋转，制造左宽右窄效果 */
        transform-origin: center left; /* 旋转轴心在书本的左边缘中心 */
    }
    .book-card-item:hover {
        transform: rotateY(-25deg) scale(1.05) translateY(-10px);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260; /* 严格维持16开比例 (正16开) */
        overflow: visible; /* 允许阴影超出容器 */
    }
    
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: 2px; /* 封面图片也带轻微圆角 */
        /* 关键：左侧的强烈阴影，越靠近书越黑 */
        filter: drop-shadow(-18px 12px 25px rgba(0,0,0,0.6)); /* 调整阴影强度和方向 */
        transition: filter 0.3s ease-out;
    }
    .book-card-item:hover .book-cover-wrapper img {
      filter: drop-shadow(-25px 18px 35px rgba(0,0,0,0.5));
    }
    
    /*
    ============================================================
    【【【 视觉最终版 3：底板图片与更黑的阴影 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 25px;
        background-image: url('/images/muban.jpg'); /* 深色木板底图 */
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    }
    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -10px; left: 0%; /* 关键：阴影面积更靠近底板 */
      width: 100%; height: 20px; /* 阴影面积更大 */
      background: transparent;
      /* 关键：更黑、更实的阴影，越靠近底板越黑 */
      box-shadow: 0 10px 25px 15px rgba(0, 0, 0, 0.95);
      filter: blur(15px); /* 更模糊，更自然 */
      z-index: -1;
    }

    /*
    ============================================================
    【【【 恢复的样式：搜索模态框等 】】】
    ============================================================
    */
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

    /* 其他通用样式 */
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
  `}</style>)
}
