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
        /* [优化] 解决背景放大问题：确保根元素占据整个视口高度 */
        height: 100%;
        margin: 0;
        padding: 0;
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
      background-attachment: fixed;
      background-position: center;
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      position: relative;
      /* [优化] 解决背景放大问题：确保主容器至少占据整个视口高度，为背景图提供稳定参照 */
      min-height: 100vh;
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
        padding-bottom: 15px; /* 调整回15px以匹配底板高度 */
        z-index: 5;
        perspective: 1500px; /* 透视效果可以稍微柔和一些 */
    }

    .shelf-row:first-of-type { margin-top: 4rem; }

    .books-on-shelf {
        display: flex; justify-content: center; align-items: flex-end;
        gap: 1.5rem; /* 稍微增加间距 */
        padding: 0 1.5rem; width: 100%;
    }

    .book-card-item {
        position: relative;
        width: calc(33.33% - 1.5rem);
        max-width: 150px; /* 统一尺寸 */
        z-index: 20;
        /* [优化] 动画曲线更生动 (ease-out-back 效果)，带有回弹感 */
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-style: preserve-3d;
        transform: rotateX(0.1deg) rotateY(-17deg) rotateZ(0.6deg);
    }

    /* [优化] 增加书本摆放的自然随机感，打破完美统一 */
    .books-on-shelf .book-card-item:nth-child(3n+1) {
        transform: rotateX(0.2deg) rotateY(-16.5deg) rotateZ(0.4deg);
    }
    .books-on-shelf .book-card-item:nth-child(3n+2) {
        transform: rotateX(-0.1deg) rotateY(-17.5deg) rotateZ(0.7deg);
    }

    .book-card-item:hover {
        /* [优化] 悬停时向上移动距离可以更明显 */
        transform: translateY(-30px) scale(1.88) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        z-index: 30;
    }

    .book-cover-wrapper {
        width: 100%;
        aspect-ratio: 3 / 4;
        position: relative;
        transform-style: preserve-3d;
        /* [优化] 增加边缘细节和过渡效果 */
        box-shadow:
            inset 4px 0 8px -4px rgba(0,0,0,0.7), /* 主要内阴影，模拟深度 */
            inset 0.5px 0 0.5px rgba(255,255,255,0.1); /* 边缘微弱高光 */
        border-radius: 5px 2px 2px 4px; /* 微调圆角，使其更像真实书本 */
        transition: box-shadow 0.3s ease-out; /* 为悬停效果添加过渡 */
    }

    /* [优化] 悬停时增加外发光效果，让书本更突出 */
    .book-card-item:hover .book-cover-wrapper {
        box-shadow:
            inset 5px 0 10px -4px rgba(0,0,0,0.8),
            inset 0.5px 0 0.5px rgba(255,255,255,0.15),
            0 0 15px rgba(255, 255, 255, 0.2);
    }

    .book-cover-wrapper::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 16px; /* 书本厚度 */
        background: linear-gradient(to right, #e8e8e8, #ffffff, #f0f0f0);
        border-top-left-radius: 7px;
        transform-origin: bottom;
        transform: translateY(-16px) rotateX(90deg);
        /* [优化] 为页面边缘增加细微阴影，增加层次感 */
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .book-cover-wrapper img {
        width: 100%; height: 100%; object-fit: cover;
        display: block;
        border-radius: inherit;
        /* [优化] 使用多层阴影模拟更真实的光照效果 */
        filter:
            drop-shadow(-8px 10px 15px rgba(0, 0, 0, 0.35))   /* 主光源阴影 */
            drop-shadow(-4px 6px 20px rgba(0, 0, 0, 0.2))    /* 环境光阴影 */
            drop-shadow(1px -1px 1px rgba(255, 255, 255, 0.05)); /* 模拟边缘反射光 */
        transition: filter 0.3s ease-out;
    }

    .book-card-item:hover .book-cover-wrapper img {
      /* [优化] 悬停时阴影加深、变广，模拟书本被“拿起”的效果 */
      filter:
          drop-shadow(-15px 20px 25px rgba(0, 0, 0, 0.5))
          drop-shadow(-8px 12px 30px rgba(0, 0, 0, 0.3))
          drop-shadow(2px -2px 2px rgba(255, 255, 255, 0.1));
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
