// themes/heo/components/HomepagePriceInfo.js
// 首页特有的价格信息组件

export default function HomepagePriceInfo() {
  return (
    <div className="py-8 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md px-5 md:px-0 mx-auto max-w-7xl">
      <div className="text-2xl font-bold mb-4 text-center dark:text-white">课程价格</div>
      <div className="flex flex-col space-y-3 text-lg text-gray-700 dark:text-gray-200">
        {/* 网课部分 */}
        <div className="flex justify-between items-center px-4">
          <span className="font-bold">网课 (每周1-5)</span>
          <span>口语 <span className="text-yellow-500 font-bold">100元/月</span> (1小时/天)</span>
          <span>HSK <span className="text-yellow-500 font-bold">150元/月</span> (3小时/天)</span>
        </div>
        <hr className="my-2 border-dashed dark:border-gray-700" />
        {/* 线下部分 */}
        <div className="flex justify-between items-center px-4">
          <span className="font-bold">线下 (每周1-6)</span>
          <span>口语 <span className="text-green-500 font-bold">200元/月</span> (2小时/天)</span>
          <span>HSK <span className="text-green-500 font-bold">200元/月</span> (3小时/天)</span>
        </div>
      </div>
      <div className="mt-6 text-center text-sm opacity-80 text-gray-600 dark:text-gray-400">
          <p>仰光市某某区</p>
          <p>瑞丽市某某区</p>
      </div>
    </div>
  )
}
