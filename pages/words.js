// pages/words.js (最终修复版：字典数据筛选，匹配 Notion 实际列名 'Column 6')

import { getGlobalData } from '@/lib/db/getSiteData';
import { useGlobal } from '@/lib/global';
import { DynamicLayout } from '@/themes/theme';
import WordListPage from '@/themes/heo/components/WordListPage'; // 导入字典组件

const Words = (props) => {
  const { locale } = useGlobal();
  const { siteInfo, words } = props; 
  
  // 在浏览器控制台打印筛选后的单词数量，方便调试
  console.log('Rendered words on client:', words?.length || 0);

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

  console.log(`[Build Log] Total pages fetched from Notion: ${props.allPages?.length || 0}`);
  
  const filteredWords = props.allPages
    ? props.allPages.filter(page => {
        // --- 关键修改：读取名为 'Column 6' 的属性 ---
        const pageTypeProperty = page.properties?.['Column 6']; // 获取名为 'Column 6' 的属性对象
        const pageTypeName = pageTypeProperty?.select?.name; // 获取其 Select 类型的值 (例如 'Word')
        
        const isPublished = page.status === 'Published'; // 确保状态为 Published

        return pageTypeName === 'Word' && isPublished; // 筛选 'Column 6' 值为 'Word' 且已发布的页面
      })
    : [];
  
  console.log(`[Build Log] Filtered words with type 'Word': ${filteredWords.length}`);
  
  // 将筛选并格式化后的单词数据传递给页面组件
  props.words = filteredWords.map(page => ({
    title: page.title, // 'title' 对应 Notion 的主属性 "名称"
    pinyin: page.pageProperties?.拼音?.rich_text?.[0]?.plain_text || '', // 读取 "拼音" 属性
    myanmar: page.pageProperties?.缅文?.rich_text?.[0]?.plain_text || '', // 读取 "缅文" 属性
    // 如果有其他属性，例如 HSK 级别、例句等，也要确保这里能正确读取
    // hskLevel: page.pageProperties?.['HSK 级别']?.select?.name || '', 
    // example: page.pageProperties?.例句?.rich_text?.[0]?.plain_text || '',
  }));
  
  delete props.allPages;

  return {
    props,
    revalidate: 1
  };
}

export default Words;
