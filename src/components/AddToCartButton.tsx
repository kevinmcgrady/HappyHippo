'use client';

import { useEffect, useState } from 'react';

import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

import { Button } from './ui/button';

type AddToCardProps = {
  product: Product;
};

export const AddToCartButton = ({ product }: AddToCardProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size='lg'
      className='w-full'
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};
