import { useLayoutEffect, useState } from 'react';

export const useIsTruncated = <T extends HTMLElement = HTMLElement>(
  textRef: React.RefObject<T | null>,
) => {
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const tr = textRef.current;
    if (!tr) return;

    const checkOverflow = () => {
      setTruncated(tr.scrollWidth > tr.clientWidth);
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [textRef]);

  return truncated;
};
