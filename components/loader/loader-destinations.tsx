import React from 'react';
import { Skeleton } from '../ui/skeleton';

function LoaderDestinations() {
  return (
    <>
      <div className='flex flex-col'>
          <Skeleton className='h-[288px]  w-[288px] mb-4' />
          <Skeleton className='h-4 w-[288px] mb-4' />
          <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='flex flex-col'>
          <Skeleton className='h-[288px] w-[288px] mb-4' />
          <Skeleton className='h-4 w-[288px] mb-4' />
          <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='flex flex-col'>
          <Skeleton className='h-[288px] w-[288px] mb-4' />
          <Skeleton className='h-4 w-[288px] mb-4' />
          <Skeleton className='h-4 w-[200px]' />
      </div>
      <div className='flex flex-col'>
          <Skeleton className='h-[288px] w-[288px] mb-4' />
          <Skeleton className='h-4 w-[288px] mb-4' />
          <Skeleton className='h-4 w-[200px]' />
      </div>
    </>
  );
}

export default LoaderDestinations;
