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
    【【【 视觉优化版 1：背景、顶栏/底板样式与布局 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg'); /* 主背景图 */
      background-size: cover;
      /* [修改] 取消背景图固定，改为随页面滚动 */
      background-attachment: scroll; 
      background-position: center;
      /* [修改] 增加轻微的磨砂玻璃效果，提升整体质感 */
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      /* [新增] 为第一排书架增加顶部空间，避免紧贴顶栏 */
      padding-top: 3rem;
    }

    /* 顶部导航栏 (顶板) */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
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
    【【【 视觉优化版 2：书本尺寸、立体感、透视与阴影 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 3.5rem; /* 适当增加行间距以容纳更强的阴影和立体效果 */
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 25px; /* 关键：确保书本立在底板上方 */
        perspective: 4000px; /* 增强3D舞台感, 为更强的3D效果做准备 */
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 1.2rem; /* 调整书本间隙 */
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        position: relative; /* [新增] 为伪元素定位提供基准 */
        width: calc(33.33% - 1.5rem); 
        max-width: 170px; /* 略微增大最大宽度 */
        z-index: 20;
        transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform-style: preserve-3d;
        
        /* 关键：正确的透视旋转！书本向右后方倾斜，左边宽右边窄 */
        transform: rotateY(45deg); 
        transform-origin: center left; /* 旋转轴心在书本的左边缘中心 */
    }

    /* [新增] 使用伪元素模拟书本的厚度（书页侧面），这是立体感的关键！ */
    .book-card-item::before {
        content: '';
        position: absolute;
        top: 2px; /* 细微调整，避免与封面完全重合 */
        left: 0;
        width: 18px; /* 书本的厚度 */
        height: calc(100% - 4px); /* 模拟上下书壳的边距 */
        background: linear-gradient(to right, #ddd, #fff, #ddd); /* 模拟书页的颜色和光感 */
        transform-origin: left;
        transform: rotateY(-90deg) translateX(-18px); /* 旋转90度并移到正确位置形成侧面 */
        box-shadow: inset 2px 0 5px rgba(0,0,0,0.2); /* 增加内阴影，更有层次 */
    }

    .book-card-item:hover {
        /* [优化] 悬停效果更明显，向前弹出，更有交互感 */
        transform: translateZ(35px) rotateY(-20deg) scale(1.08) translateY(-15px);
        z-index: 30; /* 确保弹出的书在最上层 */
    }
    
    .book-cover-wrapper {
        width: 100%;
        /* [修改] 调整宽高比，让封面更矮一些 (视觉上更宽) */
        aspect-ratio: 4 / 5; 
        overflow: visible; /* 允许阴影超出容器 */
        position: relative; /* [新增] 为伪元素定位提供基准 */
        transform-style: preserve-3d; /* [新增] 确保3D变换生效 */
    }
    
    /* [新增] 封面上的光影叠加层，避免封面过于平淡，增加光照感 */
    .book-cover-wrapper::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to top right, rgba(0,0,0,0.15) 0%, transparent 40%);
        border-radius: 0.6px;
    }
    
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: 0.6px; 
        /* 关键：左侧的强烈阴影，越靠近书越黑 */
        filter: drop-shadow(-18px 12px 25px rgba(0,0,0,0.6)); 
        transition: filter 0.3s ease-out;
    }
    .book-card-item:hover .book-cover-wrapper img {
      filter: drop-shadow(-28px 20px 40px rgba(0,0,0,0.5));
    }
    
    /*
    ============================================================
    【【【 视觉优化版 3：底板图片、细节与阴影 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute;
        bottom: 0; 
        /* [修改] 两端留空，不再是100%宽度 */
        left: 5%;
        width: 90%;
        height: 25px;
        background-image: url('/images/muban.jpg'); /* 深色木板底图 */
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    }

    /* [新增] 在木板上方增加一个深色压条，增加细节和高级感，两端直角 */
    .shelf-plank::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px; /* 压条的高度 */
        background-color: #2a1d12; /* 深木色 */
        border-top-left-radius: 4px; /* 跟随父元素圆角 */
        border-top-right-radius: 4px;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.5); /* 压条的内阴影，增加立体感 */
    }

    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -10px; 
      /* [修改] 阴影也跟随父元素宽度 */
      left: 0;
      width: 100%; 
      height: 20px; 
      background: transparent;
      /* [优化] 调整阴影参数，使其更集中、更真实 */
      box-shadow: 0 12px 28px 12px rgba(0, 0, 0, 0.9);
      filter: blur(15px); 
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
