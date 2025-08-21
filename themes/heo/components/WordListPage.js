// themes/heo/components/WordListPage.js (最终修复版)

import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/config';

const WordListPage = ({ words }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredWords(words);
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = words.filter(word => {
      // --- 核心搜索逻辑 ---
      const chinese = word.title?.toLowerCase() || '';
      const pinyin = word.pinyin?.toLowerCase() || '';
      const myanmar = word.myanmar?.toLowerCase() || '';
      return (
        chinese.includes(lowerCaseQuery) ||
        pinyin.includes(lowerCaseQuery) ||
        myanmar.includes(lowerCaseQuery)
      );
    });
    setFilteredWords(results);
  }, [searchQuery, words]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">汉缅词典</h1>
      <div className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索中文、拼音或缅文..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">中文</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">拼音</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">缅文</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-[#1e1e1e] dark:divide-gray-700">
            {filteredWords && filteredWords.length > 0 ? (
              filteredWords.map((word, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-gray-100">{word.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{word.pinyin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-gray-300 font-notosansmyanmar">{word.myanmar}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500 dark:text-gray-400">
                  {searchQuery ? '没有找到匹配的词条' : '字典加载中或暂无词条...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WordListPage;
