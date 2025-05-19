'use client';

import {
  useEffect,
  useState,
  useRef,
  RefObject,
  useCallback,
  useLayoutEffect,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollThumb } from '@/components';
import { useScrollThumb } from '@/hooks';
import classnames from 'classnames';

interface ScrollBarContainerProps {
  scrollAreaRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
}

export const ScrollBarContainer = ({
  scrollAreaRef,
  children,
  className = '',
}: ScrollBarContainerProps) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const { thumbHeight, thumbTop, updateThumb } = useScrollThumb(
    scrollAreaRef,
    scrollBarRef,
  );
  const draggingRef = useRef(false);
  const dragStartY = useRef(0);
  const scrollStart = useRef(0);

  const shouldShowScrollbar = useCallback(() => {
    const ta = scrollAreaRef.current;
    if (!ta) return false;

    return ta.scrollHeight > ta.clientHeight;
  }, [scrollAreaRef]);

  useEffect(() => {
    const ta = scrollAreaRef.current;
    if (!ta) return;

    const r = new ResizeObserver(() => {
      setShowScrollbar(shouldShowScrollbar());
      updateThumb();
    });
    r.observe(ta);

    return () => r.disconnect();
  }, [shouldShowScrollbar, scrollAreaRef, updateThumb]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    setShowScrollbar((prev) => {
      const need = shouldShowScrollbar();
      return prev === need ? prev : need;
    });

    const id = requestAnimationFrame(updateThumb);
    return () => cancelAnimationFrame(id);
  });
  /* eslint-enable react-hooks/exhaustive-deps */

  const onThumbMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    draggingRef.current = true;
    dragStartY.current = e.clientY;
    scrollStart.current = scrollAreaRef.current?.scrollTop ?? 0;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const ta = scrollAreaRef.current;
    const sa = scrollBarRef.current;

    if (!ta || !sa || !draggingRef.current) return;

    const scrollableHeight = ta.scrollHeight - ta.clientHeight;
    const scrollTrackHeight = sa.clientHeight - thumbHeight;

    const deltaY = e.clientY - dragStartY.current;
    const scrollDelta = (deltaY / scrollTrackHeight) * scrollableHeight;

    ta.scrollTop = scrollStart.current + scrollDelta;

    updateThumb();
  };

  const onMouseUp = () => {
    draggingRef.current = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const scrollBarVariants = {
    hidden: {
      opacity: 0,
      y: -25,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -25,
      transition: {
        duration: 0.14,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={classnames('flex w-full flex-1', className)}>
      {children}
      <AnimatePresence>
        {showScrollbar && (
          <motion.div
            className="absolute top-0 right-[-22px] flex items-center w-2 h-full"
            variants={scrollBarVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="flex w-full h-[75%] rounded bg-[rgb(232_232_237)]/80 shadow-inset-1px">
              <div ref={scrollBarRef} className="relative w-full">
                <ScrollThumb
                  height={thumbHeight}
                  top={thumbTop}
                  onDragStart={onThumbMouseDown}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
