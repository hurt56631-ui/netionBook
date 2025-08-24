// themes/heo/components/BookDisplayList.js
// 最终版本：修复了观看链接的获取逻辑，以匹配新的 Notion 属性名 'ContentType'。

import { useState, useEffect } from 'react';
import BookDisplayCard from './BookDisplayCard'; // 导入单个书籍卡片组件
import { getGlobalData } from '@/lib/db/getSiteData'; // 导入获取数据的函数

const BookDisplayList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const props = await getGlobalData({ from: 'book-page' });
        const allPages = props.allPages || [];
        
        const filteredBooks = allPages.filter(page => {
          // --- 关键修改：读取名为 'ContentType' 的属性 ---
          const pageType = page?.properties?.ContentType?.select?.name || page?.type;
          const isPublished = page.status === 'Published';
          return pageType === 'Book' && isPublished; // 筛选 'ContentType' 值为 'Book' 且已发布的页面
        });

        const formattedBooks = filteredBooks.map(page => ({
          id: page.id,
          title: page.title,
          coverImageUrl: page.pageCoverThumbnail,
          viewUrl: page.pageProperties?.['观看链接']?.url || page.href,
        }));

        setBooks(formattedBooks);
      } catch (err) {
        console.error("Failed to fetch book data:", err);
        setError("无法加载书籍数据，请检查网络或Notion配置。");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-500 dark:text-gray-400">加载书籍中...</div>;
  if (error) return <div className="text-center py-8 text-red-500">错误: {error}</div>;
  if (books.length === 0) return <div className="text-center py-8 text-gray-500 dark:text-gray-400">书库中暂无书籍。</div>;

  return (
    <div className='py-8 px-5'>
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">我的书库</h2>
      <div className='grid grid-cols-3 gap-4'>
        {books.map(book => <BookDisplayCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};

export default BookDisplayList;
