// pages/words.js

import { getGlobalData } from '@/lib/db/getSiteData';
import { useGlobal } from '@/lib/global';
import { DynamicLayout } from '@/themes/theme'; // 使用 DynamicLayout
import WordListPage from '@/themes/heo/components/WordListPage'; // 导入字典组件

const Words = (props) => {
  const { locale } = useGlobal();
  const { siteInfo, words } = props; // 直接从 props 中获取 words
  
  // 在浏览器控制台打印筛选后的单词数量
  console.log('Rendered words on client:', words);

  const { title, description } = siteInfo;
  const meta = {
    title: `汉缅词典 | ${title}`,
    description,
    type: 'website'
  };

  return (
    <DynamicLayout {...props} meta={meta}>
      <WordListPage words={words} />
    </DynamicLayout>
  );
};

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'words-page' });
  delete props.posts;

  // --- 关键调试：在构建时打印获取到的数据 ---
  console.log(`Total pages fetched from Notion: ${props.allPages?.length || 0}`);
  
  const filteredWords = props.allPages
    ? props.allPages.filter(page => page.type === 'Word' && page.status === 'Published')
    : [];
  
  console.log(`Filtered words with type 'Word': ${filteredWords.length}`);
  
  // --- 调试结束 ---

  // 将筛选并格式化后的单词数据传递给页面组件
  props.words = filteredWords.map(page => ({
    title: page.title,
    pinyin: page.pageProperties?.拼音 || '',
    myanmar: page.pageProperties?.缅文 || '',
    // 添加其他您需要的属性
  }));
  
  // 删除 allPages，因为它很大，不需要传递给前端
  delete props.allPages;

  return {
    props,
    revalidate: 1
  };
}

export default Words;
