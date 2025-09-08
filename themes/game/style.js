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
    【【【 视觉升级 1：顶栏和背景使用图片纹理，移除模糊 】】】
    ============================================================
    */
    /* 主背景 */
    #theme-game {
      background-image: url('/images/wood-texture.jpg'); /* 使用您的木纹图片 */
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      /* 移除所有模糊效果 */
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    /* 顶部导航栏 */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        /* 使用与主背景相同的图片 */
        background-image: url('/images/wood-texture.jpg');
        background-size: cover;
        background-position: center top;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        border-bottom: 2px solid rgba(0,0,0,0.2);
        color: #333; /* 深色文字以适应浅色背景 */
    }
    .top-app-bar .title { font-weight: bold; font-size: 1.25rem; }
    .top-app-bar .subtitle { color: #555; }
    .top-app-bar .search-button { color: #333; }

    /* 书架主容器 - 现在是透明的，直接显示背景 */
    .bookshelf-main-container {
        padding: 4rem 1rem 3rem 1rem; 
        margin: 0.5rem; 
    }
    
    /*
    ============================================================
    【【【 视觉升级 2：书架底板使用图片 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 25px;
        background-image: url('/images/muban.jpg'); /* 使用您的木板图片 */
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        z-index: 10;
    }
    
    /*
    ============================================================
    【【【 视觉升级 3：书本3D倾斜、直角、16开比例 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 3rem;
        display: flex; 
        justify-content: center; 
        align-items: flex-end; 
        min-height: 18rem;
    }
    .books-on-shelf {
        display: flex; 
        justify-content: center; 
        align-items: flex-end; 
        gap: 2.5rem; /* 增大间距以容纳倾斜效果 */
        transform-style: preserve-3d;
        perspective: 2000px; /* 设定3D舞台的透视深度 */
    }
    
    .book-card-item { 
        width: 160px; /* 固定宽度以更好地控制布局 */
        z-index: 20;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        
        /* 关键：赋予书本强烈的3D倾斜效果 */
        transform: rotateY(-30deg); 
    }
    .book-card-item:hover {
        transform: rotateY(-15deg) scale(1.05) translateY(-10px);
        box-shadow: 0 25px 40px rgba(0,0,0,0.4);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260; /* 严格维持16开比例 */
        border-radius: 2px 0 0 2px; /* 左侧轻微圆角，右侧直角 */
        overflow: hidden;
        transform-style: preserve-3d; /* 允许子元素进行3D变换 */
        box-shadow: -5px 5px 20px rgba(0,0,0,0.3);
    }
    .book-cover-wrapper img {
        width: 100%; height: 100%;
        object-fit: cover;
    }
    /* 模拟书脊厚度 */
    .book-cover-wrapper::before {
        content: ''; position: absolute;
        top: 0; left: 0; width: 22px; height: 100%;
        background: #f0f0f0; /* 书脊颜色 */
        transform-origin: left;
        transform: rotateY(90deg) translateX(-11px) translateZ(11px);
        background-image: linear-gradient(to right, rgba(0,0,0,0.2), transparent 30%, transparent 70%, rgba(0,0,0,0.1));
    }
    
    /*
    ============================================================
    【【【 视觉升级 4：添加装饰品 】】】
    ============================================================
    */
    .decoration {
        position: absolute;
        bottom: 25px; /* 放置在木板上方 */
        z-index: 15; /* 在书本后面 */
        filter: brightness(0.9) drop-shadow(5px 5px 10px rgba(0,0,0,0.3));
    }
    .deco-item-1 {
        right: -30px;
        width: 80px;
        transform: rotateY(30deg); /* 让装饰品也有一点透视感 */
    }
    .deco-item-2 {
        left: -40px;
        width: 100px;
        transform: rotateY(-20deg);
    }

    /* 搜索框等其他样式 */
    /* ... (保持您原有的功能性样式) ... */
    
  `}</style>)
}
