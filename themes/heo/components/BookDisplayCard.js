// themes/heo/components/BookDisplayCard.js
// 用于渲染单本图书的图片卡片，点击跳转观看链接。

import LazyImage from '@/components/LazyImage';
import SmartLink from '@/components/SmartLink';
import { siteConfig } from '@/lib/config';
import CONFIG from '../config'; // 假设主题 config 在同级 config.js

const BookDisplayCard = ({ book }) => {
  // 确保有封面图，或使用默认封面
  const coverImage = book?.coverImageUrl || siteConfig('DEFAULT_BOOK_COVER', null, CONFIG); // 假设有 DEFAULT_BOOK_COVER 配置项
  
  if (!book || !book.title || !coverImage || !book.viewUrl) {
    // console.warn("Book data incomplete for:", book?.title || book?.id); // 用于调试
    return null; // 如果数据不完整，不渲染
  }

  return (
    <SmartLink href={book.viewUrl} passHref legacyBehavior>
      <article 
        key={book.id} 
        className='group relative block w-full rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300'
        style={{ paddingBottom: '150%' }} // 强制 2:3 竖屏比例 (高度是宽度的 150%)
      >
        {/* 图片容器，设置为绝对定位，并铺满 */}
        <div className='absolute inset-0 w-full h-full'>
          <LazyImage
            src={coverImage}
            alt={book.title}
            className='w-full h-full object-cover' // 图片铺满容器，保持比例
          />
        </div>
        
        {/* 标题遮罩 (可选，如果图片上没有文字) */}
        <div className='absolute inset-x-0 bottom-0 p-3 bg-black/50 text-white text-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {book.title}
        </div>
        
      </article>
    </SmartLink>
  );
};

export default BookDisplayCard;
