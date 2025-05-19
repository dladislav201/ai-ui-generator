'use client';

import {
  RenderIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
import { useIsTruncated } from '@/hooks';
import { TableCell } from '@/models';
import { useRef } from 'react';

interface TableCellItemProps {
  cell: TableCell;
}

export const TableCellItem = ({ cell }: TableCellItemProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const isTruncated = useIsTruncated(textRef);

  const textNode = (
    <span ref={textRef} className="truncate">
      {cell.name}
    </span>
  );

  return (
    <div className="inline-flex items-center gap-2 min-w-0">
      {cell.icon && (
        <RenderIcon iconName={cell.icon} className="h-4 w-4 flex-shrink-0" />
      )}
      {isTruncated ? (
        <Tooltip>
          <TooltipTrigger asChild>{textNode}</TooltipTrigger>
          <TooltipContent>{cell.name}</TooltipContent>
        </Tooltip>
      ) : (
        textNode
      )}
    </div>
  );
};
