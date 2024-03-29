'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { boolean } from 'webidl-conversions';

import { CATEGORIES } from '@/constants/categories';
import { cn, formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';

import { ImageSlider } from './ImageSlider';
import { ProductPlaceholder } from './ProductPlaceholder';

type ProductListingProps = {
  product: Product | null;
  index: number;
};

export const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          'visible animate-in fade-in-5': isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />
          <h3 className='mt-4 font-medium text-sm text-gray-700'>
            {product.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{label}</p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};
