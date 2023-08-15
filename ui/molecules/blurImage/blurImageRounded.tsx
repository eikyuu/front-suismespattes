import Image from 'next/image';
import { useState } from 'react';

export default function BlurImageRounded({ image } : { image: any}) {
    const [isLoading, setLoading] = useState(true);
  
    return (
      <a href={image.href} className="group">
        <div className="rounded-full">
          <Image
            alt=""
            src={image}
            width={200}
            height={300}
            className={`w-48 h-48 rounded-full object-cover border-8 border-white
                duration-700 ease-in-out group-hover:opacity-75
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </a>
    );
  }