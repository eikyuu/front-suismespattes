import React from 'react';
import ScrollUp from '../../../../@core/utils/scrollUp';
import DestinationContainer from '../../../components/DestinationContainer';

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
