// components/GlosbeSearchCard.js

import { useState } from 'react';

const GlosbeSearchCard = () => {
  // 使用 useState 来存储用户输入的内容
  const [searchTerm, setSearchTerm] = useState('');

  // 处理表单提交的函数
  const handleSearch = (e) => {
    // 阻止表单默认的刷新页面的行为
    e.preventDefault();
    if (!searchTerm.trim()) {
      // 如果输入为空，则不执行任何操作
      return;
    }
    
    // 构建 Glosbe 的搜索 URL
    // 缅甸语代码是 my, 中文代码是 zh
    // 使用 encodeURIComponent 来确保特殊字符（如空格）能被正确处理
    const glosbeUrl = `https://zh.glosbe.com/my/zh/${encodeURIComponent(searchTerm)}`;
    
    // 在新标签页中打开该 URL
    window.open(glosbeUrl, '_blank');
  };

  return (
    <div className='my-4 p-5 rounded-xl border dark:border-gray-600 bg-white dark:bg-[#1e1e1e] shadow-md'>
      <div className='flex items-center mb-4'>
        <i className='fa-solid fa-language text-2xl text-indigo-500 dark:text-yellow-500 mr-3'></i>
        <h2 className='text-2xl font-bold dark:text-white'>Glosbe 缅中词典</h2>
      </div>
      <p className='text-gray-600 dark:text-gray-300 mb-4'>
        请输入您要查询的缅甸语或中文字词。
      </p>
      <form onSubmit={handleSearch} className='flex gap-2'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='例如：မင်္ဂလာပါ 或 你好'
          className='flex-grow px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white'
        />
        <button
          type='submit'
          className='bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-200'
        >
          查询
        </button>
      </form>
    </div>
  );
};

export default GlosbeSearchCard;```
