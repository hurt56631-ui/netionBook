// pages/books.js
// 这个页面用于显示书籍列表。

import { getGlobalData } from '@/lib/db/getSiteData'; 
import { DynamicLayout } from '@/themes/theme'; 
import BookDisplayList from '@/themes/heo/components/BookDisplayList'; // 导入书籍列表组件

const BooksPage = (props) => {
  const { siteInfo, allPages } = props; // <-- 确保接收 allPages
  const meta = {
    title: `我的书库 | ${siteInfo?.title}`,
    description: `我的书籍收藏和阅读链接`,
    type: 'website'
  };

  return (
    <DynamicLayout {...props} meta={meta}>
      <BookDisplayList allPages={allPages} /> {/* <-- 将 allPages 传递给 BookDisplayList */}
    </DynamicLayout>
  );
};

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'books-page' });
  delete props.posts; // 这个页面不需要文章列表
  return {
    props,
    revalidate: 1
  };
}

export default BooksPage;
