import { useState, RefObject, useCallback, useEffect } from 'react';

export function useScrollThumb(
  scrollAreaRef: RefObject<HTMLElement | null>,
  scrollBarRef: RefObject<HTMLElement | null>,
) {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  const updateThumb = useCallback(() => {
    const ta = scrollAreaRef.current;
    const sa = scrollBarRef.current;
    if (!ta || !sa) return;

    const { scrollTop, scrollHeight, clientHeight } = ta;
    const scrollBarHeight = sa.clientHeight;
    const newThumbH = Math.max(
      (clientHeight / scrollHeight) * scrollBarHeight,
      30,
    );
    const newThumbTop =
      (scrollTop / (scrollHeight - clientHeight)) *
      (scrollBarHeight - newThumbH);

    setThumbHeight(newThumbH);
    setThumbTop(newThumbTop);
  }, [scrollAreaRef, scrollBarRef]);

  useEffect(() => {
    const ta = scrollAreaRef.current;
    if (!ta) return;

    const handleScroll = () => updateThumb();
    ta.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateThumb);

    updateThumb();

    return () => {
      ta.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateThumb);
    };
  }, [scrollAreaRef, updateThumb]);

  return { thumbHeight, thumbTop, updateThumb };
}
