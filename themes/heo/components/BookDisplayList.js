// themes/heo/components/BookDisplayList.js
// 最终版本：不再需要手动填写 Notion ID，直接从 props 接收数据。

import { useState, useEffect } from 'react';
import BookDisplayCard from './BookDisplayCard'; // 导入单个书籍卡片组件

const BookDisplayList = ({ allPages }) => { // <-- 从 props 接收 allPages
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      if (allPages) {
        const filteredBooks = allPages.filter(page => {
          const pageType = page?.properties?.type?.select?.name || page?.type;
          const isPublished = page.status === 'Published';
          return pageType === 'Book' && isPublished; // 筛选 type 为 'Book' 且已发布的页面
        });

        const formattedBooks = filteredBooks.map(page => ({
          id: page.id,
          title: page.title,
          coverImageUrl: page.pageCoverThumbnail, // 使用 Notion 的 pageCoverThumbnail 作为封面
          viewUrl: page.pageProperties?.['观看链接']?.url || page.href, // 假设有“观看链接”属性
        }));

        setBooks(formattedBooks);
      } else {
        setBooks([]); // 如果 allPages 不存在，设置为空数组
      }
    } catch (err) {
      console.error("Failed to process book data:", err);
      setError("无法处理书籍数据。");
    } finally {
      setLoading(false);
    }
  }, [allPages]); // 当 allPages prop 变化时，重新运行

  if (loading) return <div className="text-center py-8 text-gray-500 dark:text-gray-400">加载书籍中...</div>;
  if (error) return <div className="text-center py-8 text-red-500">错误: {error}</div>;
  if (books.length === 0) return <div className="text-center py-8 text-gray-500 dark:text-gray-400">书库中暂无书籍。</div>;

  return (
    <div className='py-8 px-5'>
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">我的书库</h2>
      <div className='grid grid-cols-3 gap-4'> {/* 三列布局 */}
        {books.map(book => <BookDisplayCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};

export default BookDisplayList;
