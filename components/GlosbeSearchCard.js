// /components/GlosbeSearchCard.js

import { useState } from 'react'

/**
 * Glosbe 在线词典搜索卡片
 * - 支持缅中双向互译切换
 * - 在新标签页中打开搜索结果，以解决 iframe 加载被阻止的问题
 */
const GlosbeSearchCard = () => {
  // state for the word to search
  const [word, setWord] = useState('')
  // state for the search direction: 'my2zh' or 'zh2my'
  const [searchDirection, setSearchDirection] = useState('my2zh')

  // Toggle search direction
  const toggleDirection = () => {
    setSearchDirection(prev => (prev === 'my2zh' ? 'zh2my' : 'my2zh'))
    // Clear previous search word when direction changes
    setWord('')
  }

  // Handle the search action
  const handleSearch = () => {
    if (word.trim()) {
      let glosbeUrl = ''
      if (searchDirection === 'my2zh') {
        // Burmese to Chinese
        glosbeUrl = `https://glosbe.com/my/zh/${encodeURIComponent(word)}`
      } else {
        // Chinese to Burmese
        glosbeUrl = `https://glosbe.com/zh/my/${encodeURIComponent(word)}`
      }
      // Open the URL in a new browser tab. This is the fix.
      window.open(glosbeUrl, '_blank')
    }
  }

  // Handle input changes
  const handleInputChange = (e) => {
    setWord(e.target.value)
  }
  
  // Allow searching by pressing Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  // Dynamic placeholder text based on search direction
  const placeholderText = searchDirection === 'my2zh' ? 'မြန်မာလို ရိုက်ပါ။ ...' : '输入中文...'

  return (
    <div className="relative w-full rounded-xl shadow-md bg-white dark:bg-[#1e1e1e] p-6 border dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">汉缅词典</h2>
      
      {/* Search Input and Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        {/* Input Field */}
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          className="w-full sm:flex-grow px-4 py-2 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Direction Toggle Button */}
        <button
          onClick={toggleDirection}
          title="切换翻译方向"
          className="p-2 w-full sm:w-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
        >
          {searchDirection === 'my2zh' ? 'မြန်မာစာ → 中' : '中 → မြန်မာစာ'}
          <i className="fas fa-exchange-alt ml-2"></i>
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full sm:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-200"
        >
          查询
        </button>
      </div>
    </div>
  )
}

export default GlosbeSearchCard
