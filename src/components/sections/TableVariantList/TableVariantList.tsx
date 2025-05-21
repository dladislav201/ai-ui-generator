'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { Table as TableModel } from '@/models';
import classnames from 'classnames';

interface TableVariantListProps {
  jumpTo: (idx: number) => void;
  tableHistory: TableModel[];
  currentIdx: number;
}

export const TableVariantList = React.memo(function TableVariantList({
  jumpTo,
  tableHistory,
  currentIdx,
}: TableVariantListProps) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    sliderRef.current?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    const ref = itemRefs.current[currentIdx];
    if (ref) {
      ref.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentIdx]);

  const setItemRef = useCallback(
    (idx: number) => (el: HTMLLIElement | null) => {
      itemRefs.current[idx] = el;
    },
    [],
  );

  return (
    <div className="relative">
      <ul
        ref={sliderRef}
        className={classnames(
          'flex overflow-x-auto snap-x snap-mandatory',
          'scrollbar-hidden gap-2 mt-3 relative mask-gradient',
          {
            'justify-center': tableHistory.length <= 4,
          },
        )}
      >
        {tableHistory.map((_, idx) =>
          idx === 0 ? null : (
            <li
              key={idx}
              ref={setItemRef(idx)}
              onClick={() => jumpTo(idx)}
              className={classnames(
                'flex-none py-1 px-3 rounded-[28px] snap-start cursor-pointer bg-white',
                'border-b border-opacity-10',
                idx === currentIdx ? 'text-foreground' : 'text-description',
              )}
            >
              <p className="text-sm font-normal">Table v{idx}</p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
});
