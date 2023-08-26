import React from 'react';

function LoaderWalk() {
  return (
    <div className='container w-11/12 mx-auto flex flex-col md:flex-row md:space-x-10 pt-10 animate-pulse'>
      <div className='flex-1 space-y-6 py-1'>
        <div className='h-72 md:h-96 bg-slate-300 rounded'></div>
      </div>
      <div className='flex-1 py-1'>
        <div className='space-y-3'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-300 rounded col-span-2'></div>
            <div className='h-2 bg-slate-300 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-300 rounded'></div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-300 rounded col-span-2'></div>
            <div className='h-2 bg-slate-300 rounded col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-300 rounded'></div>
          <div className='h-2 bg-slate-300 rounded'></div>
          <div className='h-2 bg-slate-300 rounded'></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderWalk;
