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
    【【【 视觉升级 1：顶栏和背景使用不同的图片，且背景清晰 】】】
    ============================================================
    */
    /* 主背景 */
    #theme-game {
      background-image: url('/images/shujiabeijing.jpg'); /* 主书架背景图 */
      background-size: cover;
      background-attachment: fixed;
      background-position: center;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    /* 顶部导航栏 */
    .top-app-bar {
        position: sticky; top: 0; z-index: 50; 
        padding: 0.8rem 1rem;
        display: flex; align-items: center; justify-content: space-between;
        background-image: url('/images/wood-texture.jpg'); /* 独立的顶栏木纹图 */
        background-size: cover;
        background-position: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        border-bottom: 2px solid rgba(0,0,0,0.2);
        color: #333;
    }
    .top-app-bar .title { font-weight: bold; font-size: 1.25rem; }
    .top-app-bar .subtitle, .top-app-bar .search-button { color: #333; }

    /*
    ============================================================
    【【【 视觉升级 2：直接展示您的3D封面，效果完美 】】】
    ============================================================
    */
    .shelf-row {
        position: relative;
        margin-bottom: 2rem;
        padding-top: 2rem;
        display: flex; justify-content: center; align-items: flex-end; 
    }
    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end; 
        gap: 1.5rem;
    }
    
    .book-card-item { 
        width: calc(33.33% - 1.5rem);
        max-width: 180px;
        z-index: 20;
        transition: transform 0.3s ease-out;
        /* 我们不再需要CSS来做复杂的3D变换了 */
    }
    .book-card-item:hover {
        transform: translateY(-10px); /* 悬停时轻微上浮即可 */
    }
    
    .book-cover-wrapper {
        width: 100%;
        /* 移除所有CSS模拟的3D效果、阴影和边框 */
        /* 只保留一个容器 */
    }
    
    .book-cover-wrapper img {
        width: 100%; height: auto;
        display: block;
        /* 关键：使用 filter: drop-shadow 为您的透明PNG图片添加真实阴影 */
        /* 这样阴影会根据书本的不规则形状而变化，非常真实 */
        filter: drop-shadow(10px 10px 15px rgba(0,0,0,0.4));
        transition: filter 0.3s ease-out;
    }
    .book-card-item:hover .book-cover-wrapper img {
      filter: drop-shadow(15px 15px 25px rgba(0,0,0,0.3));
    }
    
    /*
    ============================================================
    【【【 视觉升级 3：装饰品透明背景处理 】】】
    ============================================================
    */
    .decoration {
        position: relative;
        align-self: flex-end;
        margin: 0 0.5rem;
        z-index: 15;
    }
    .decoration img {
      display: block;
      max-width: 80px;
      height: auto;
      /* 同样使用 drop-shadow 来确保透明图片的阴影效果正确 */
      filter: drop-shadow(5px 5px 10px rgba(0,0,0,0.3));
    }

    /* 底板样式 */
    .shelf-plank {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 25px;
        background-image: url('/images/muban.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        z-index: 10;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    }
    .shelf-plank::after {
      content: ''; position: absolute;
      bottom: -5px; left: 5%;
      width: 90%; height: 10px;
      background: transparent;
      box-shadow: 0 5px 15px 10px rgba(0, 0, 0, 0.8);
      filter: blur(10px);
      z-index: -1;
    }
    
  `}</style>)
}
