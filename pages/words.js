// pages/words.js

import { getGlobalData } from '@/lib/db/getSiteData';
import { useGlobal } from '@/lib/global';
import { DynamicLayout } from '@/themes/theme';
import WordListPage from '@/themes/heo/components/WordListPage';

const Words = (props) => {
  const { locale } = useGlobal();
  const { siteInfo, words } = props; 
  
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

  console.log(`Total pages fetched from Notion: ${props.allPages?.length || 0}`);
  
  const filteredWords = props.allPages
    ? props.allPages.filter(page => {
        // --- 关键修改：更鲁棒地读取 type 属性 ---
        // Notion API 返回的 Select 属性值通常在 page.properties.<属性名>.select.name
        const pageTypeProperty = page.properties?.type; // 获取 'type' 属性对象
        const pageTypeName = pageTypeProperty?.select?.name; // 获取 'type' 属性的值 (例如 'Word')
        
        // 同时确保状态为 Published
        const isPublished = page.status === 'Published';

        return pageTypeName === 'Word' && isPublished;
      })
    : [];
  
  console.log(`Filtered words with type 'Word': ${filteredWords.length}`);
  
  // 将筛选并格式化后的单词数据传递给页面组件
  props.words = filteredWords.map(page => ({
    title: page.title, // 'title' 对应 Notion 的主属性 "名称"
    pinyin: page.pageProperties?.拼音?.rich_text?.[0]?.plain_text || '', // 确保读取 rich_text 属性
    myanmar: page.pageProperties?.缅文?.rich_text?.[0]?.plain_text || '', // 确保读取 rich_text 属性
    hskLevel: page.pageProperties?.['HSK 级别']?.select?.name || '', // 假设您有 HSK 级别，且是 Select 类型
    example: page.pageProperties?.例句?.rich_text?.[0]?.plain_text || '', // 假设您有例句属性
  }));
  
  delete props.allPages;

  return {
    props,
    revalidate: 1
  };
}

export default Words;
