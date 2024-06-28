
import React from 'react';
import BarChart from './chartRevenueBranch';
import PieChart from './chartServices';

export default function Home() {
  return <div className="flex h-screen">
    {/* Sidebar */}
    <aside id="default-sidebar" className="fixed top-0 left-0 z-30 w-28 h-screen bg-gray-900 dark:bg-gray-800 overflow-y-auto">
      <div className="h-full px-3 py-4">
        {/* Sidebar content here */}
      </div>
    </aside>
    <div className="flex-grow ml-28">
      {/* Header */}
      <header className="bg-white top-0 left-28 z-40 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20">
          <h2>DASHBOARD</h2>
          <div className="flex items-center h-full w-80 ">
            <svg className="h-8 w-8 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="16" x2="12" y2="12" />  <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <div style={{ backgroundColor: 'gray', height: 60, width: 1 }}></div>
            <div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-24 px-2 py-2 h-full">
        <div className="container mx-auto h-full">
          <div className="flex items-center w-full mx-auto mb-4 bg-white h-12 ">
            <h2>Doanh thu</h2>
            <button className='flex rounded-md h-8 w-8 right-10 border-slate-400 border-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6">
                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="grid grid-flow-col w-full bg-white">
            <div style={{width: "33.33%"}}><h1>Doanh thu</h1>50000000</div>
            <div style={{width: "33.33%"}}><h1>Thực thu</h1>200000</div>
            <div style={{width: "33.33%"}}><h1>Công nợ</h1>200000</div>
          </div>
          <BarChart/>
          <PieChart/>
        </div>
      </main>
    </div>
  </div>


}




