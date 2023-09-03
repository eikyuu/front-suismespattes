'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BlurImage({ image, alt, height } : { image: any, alt: string, height: string}) {
    const [isLoading, setLoading] = useState(true);
  
    return (
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt={alt}
            src={image}
            width={500}
            height={500}
            className={`${height}  w-full object-cover object-center transform transition-
                duration-700 ease-in-out group-hover:opacity-75
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
    );
  }