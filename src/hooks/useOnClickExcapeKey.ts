import { useEffect } from 'react';

type Callback = () => void;

export const useOnClickEscapeKey = (action: Callback) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        action();
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [action]);
};
