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
    【【【 视觉最终版 1：顶栏与背景分离，文字修复 】】】
    ============================================================
    */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg');
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
        /* 关键：恢复粗体白字 */
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
    }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #FFFFFF; }

    /* 修复底部导航栏图标颜色 */
    footer, #footer a, #footer i {
        color: #FFFFFF !important;
        font-weight: bold !important;
    }

    /*
    ============================================================
    【【【 视觉最终版 2：修正透视、尺寸、间距和阴影 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 2.5rem;
        display: flex; justify-content: center; align-items: flex-end;
        padding-bottom: 25px; /* 为底板留出空间，让书本立在上面 */
        perspective: 3000px; /* 增强3D舞台感 */
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 1.5rem; /* 减小书本间隙 */
        transform-style: preserve-d;
    }
    
    .book-card-item { 
        width: calc(33.33% - 1.5rem);
        max-width: 180px; /* 增大书本尺寸 */
        z-index: 20;
        transition: transform 0.3s ease-out;
        transform-style: preserve-d;
        /* 关键：正确的透视旋转，右侧会变窄 */
        transform: rotateY(-35deg); 
    }
    .book-card-item:hover {
        transform: rotateY(-25deg) scale(1.05) translateY(-10px);
    }
    
    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 185 / 260; /* 严格维持16开比例 */
    }
    
    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: 2px; /* 轻微圆角 */
        /* 关键：左侧的强烈阴影 */
        filter: drop-shadow(-15px 10px 20px rgba(0,0,0,0.5));
        transition: filter 0.3s ease-out;
    }
    .book-card-item:hover .book-cover-wrapper img {
      filter: drop-shadow(-20px 15px 30px rgba(0,0,0,0.4));
    }
    
    /*
    ============================================================
    【【【 视觉最终版 3：强化底板阴影 】】】
    ============================================================
    */
    .shelf-plank {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 25px;
        background-image: url('/images/dark-muban.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
    }
    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -5px; left: 5%;
      width: 90%; height: 10px;
      background: transparent;
      /* 关键：更黑、更实的阴影 */
      box-shadow: 0 8px 20px 12px rgba(0, 0, 0, 0.9);
      filter: blur(12px);
      z-index: -1;
    }
    
  `}</style>)
}
