'use client';

import { useRef, useState } from 'react';

import { CATEGORIES } from '@/constants/categories';
import { useOnClickEscapeKey } from '@/hooks/useOnClickExcapeKey';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { NavItem } from './NavItem';

export const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));
  useOnClickEscapeKey(() => setActiveIndex(null));

  const isAnyOpen = activeIndex !== null;

  return (
    <div ref={navRef} className='flex gap-4 h-full'>
      {CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = index === activeIndex;

        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};
