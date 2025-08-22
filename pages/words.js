// pages/words.js

// ... (导入)

const Words = (props) => {
  // ... (组件)
};

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'words-page' });
  delete props.posts;

  const filteredWords = props.allPages
    ? props.allPages.filter(page => {
        // --- 这个筛选逻辑是正确的 ---
        const pageType = page?.properties?.type?.select?.name || page?.type;
        const pageStatus = page?.properties?.status?.select?.name || page?.status;
        
        return pageType === 'Word' && pageStatus === 'Published';
      })
    : [];
  
  // ... (格式化数据)
  
  return { props, revalidate: 1 };
}

export default Words;
