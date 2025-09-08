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
    【【【 视觉最终版 1：顶栏与背景分离，使用不同图片 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg'); /* 主书架背景图 */
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
    }

    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-image: url('/images/dark-wood.jpg'); /* 独立的深色顶栏木纹图 */
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        border-bottom: 2px solid rgba(0,0,0,0.3);
        color: #f0e6d2; /* 温暖的米白色文字 */
        text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
    }
    .top-app-bar .title { font-weight: bold; font-size: 1.25rem; }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #f0e6d2; }

    /*
    ============================================================
    【【【 视觉最终版 2：修正透视关系 & 书本位置 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 3rem;
        display: flex; justify-content: center; align-items: flex-end;
        /* 关键：为底板留出空间，让书本立在上面 */
        padding-bottom: 25px; 
        perspective: 2500px; /* 增强整个书架行的3D舞台感 */
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 2.5rem;
        transform-style: preserve-3d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 2rem);
        max-width: 170px;
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-3d;
        /* 关键：正确的透视旋转，右侧会变窄 */
        transform: rotateY(30deg); 
    }
    .book-card-item:hover {
        transform: rotateY(20deg) scale(1.05) translateY(-10px);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260; /* 严格维持16开比例 */
        border-radius: 2px 0 0 2px; /* 左侧轻微圆角，右侧直角 */
        overflow: hidden;
        transform-style: preserve-3d;
    }
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        /* 使用 drop-shadow 为3D封面添加真实阴影 */
        filter: drop-shadow(5px 5px 15px rgba(0,0,0,0.3));
    }
    
    /*
    ============================================================
    【【【 视觉最终版 3：处理透明饰品 & 底板阴影 】】】
    ============================================================
    */
    .decoration {
        position: relative;
        align-self: flex-end; /* 确保与书本底部对齐 */
        margin: 0 0.5rem;
        padding-bottom: 5px; /* 微调位置 */
        z-index: 15;
    }
    .decoration img {
      display: block;
      max-width: 90px;
      height: auto;
      /* 关键：为透明PNG添加阴影的唯一正确方法 */
      filter: drop-shadow(8px 8px 12px rgba(0,0,0,0.4));
    }

    .shelf-plank {
        position: absolute;
        bottom: 0; left: 0; right: 0; /* 永远在书架行最底部 */
        height: 25px;
        background-image: url('/images/dark-muban.jpg'); /* 深色底板 */
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
    }
    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -5px; left: 5%;
      width: 90%; height: 10px;
      background: transparent;
      box-shadow: 0 5px 15px 10px rgba(0, 0, 0, 0.9); /* 更黑的阴影 */
      filter: blur(10px);
      z-index: -1;
    }
    
  `}</style>)
}
