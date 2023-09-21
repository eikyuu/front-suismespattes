'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlurImageProps {
  image: any;
  alt: string;
  height: string;
}

export default function BlurImage({ image, alt, height }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
      <Image
        alt={alt}
        src={image}
        width={1140}
        height={760}
        quality={100}
        className={`${height} w-full object-cover object-center transform transition-duration-700 ease-in-out group-hover:opacity-75 ${
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
