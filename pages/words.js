// pages/words.js

import { getGlobalData } from '@/lib/db/getSiteData';
import { useGlobal } from '@/lib/global';
import { DynamicLayout } from '@/themes/theme'; // 使用 DynamicLayout 来保持主题一致性
import WordListPage from '@/themes/heo/components/WordListPage'; // 导入我们创建的字典组件

const Words = (props) => {
  const { locale } = useGlobal();
  const { siteInfo, allPages, NOTION_CONFIG } = props;

  // 从 allPages 中筛选出字典数据
  // 确保您的字典词条在 Notion 中有一个 'type' 属性，并且值为 'Word'
  const words = allPages
    ? allPages
        .filter(page => page.type === 'Word' && page.status === 'Published')
        .map(page => ({
          title: page.title, // 'title' 对应 Notion 的主属性 "名称"
          pinyin: page.pageProperties?.拼音 || '', // 读取 "拼音" 属性
          myanmar: page.pageProperties?.缅文 || '', // 读取 "缅文" 属性
          // 添加其他您需要的属性
        }))
    : [];

  const { title, description } = siteInfo;
  const meta = {
    title: `汉缅词典 | ${title}`,
    description,
    type: 'website'
  };

  return (
    // 使用 DynamicLayout 来加载您的主题布局 (例如 Heo 主题的 LayoutBase)
    <DynamicLayout {...props} meta={meta}>
      <WordListPage words={words} />
    </DynamicLayout>
  );
};

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'words-page' });
  delete props.posts; // 这个页面不需要文章列表
  return {
    props,
    revalidate: 1 // 每秒重新生成一次页面
  };
}

export default Words;
