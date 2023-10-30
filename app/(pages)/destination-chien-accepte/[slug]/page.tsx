import React from 'react';
import ScrollUp from '../../../../@core/lib/scrollUp';
import DestinationContainer from '@/components/destination-container';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {

  return (
    <>
      <ScrollUp />
      <DestinationContainer slug={params.slug} />
    </>
  );
}
