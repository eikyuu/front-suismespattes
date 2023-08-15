import React, { useId } from 'react';

function LoaderWalks() {
  return (
    <div className='container mx-auto flex flex-col flex-wrap md:flex-row justify-between animate-pulse'>

      <div className='flex flex-col space-y-3 mb-5'>
        <div className="rounded-lg bg-slate-300 h-40 w-full md:w-60"></div>
        <div className='space-y-3'>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
        </div>
      </div>

      <div className='flex flex-col space-y-3 mb-5'>
        <div className="rounded-lg bg-slate-300 h-40 w-full md:w-60"></div>
        <div className='space-y-3'>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
        </div>
      </div>

      <div className='flex flex-col space-y-3 mb-5'>
        <div className="rounded-lg bg-slate-300 h-40 w-full md:w-60"></div>
        <div className='space-y-3'>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
        </div>
      </div>

      <div className='flex flex-col space-y-3'>
        <div className="rounded-lg bg-slate-300 h-40 w-full md:w-60"></div>
        <div className='space-y-3'>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
          <div className='h-2 w-24 bg-slate-300 rounded'></div>
          <div className='h-2 w-12 bg-slate-300 rounded'></div>
        </div>
      </div>


    </div>
  );
}

export default LoaderWalks;
