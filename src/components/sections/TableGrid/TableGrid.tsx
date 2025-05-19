'use client';

import { RenderIcon, TooltipProvider, TableCellItem } from '@/components';
import { TableCell, IconName } from '@/models';
import classnames from 'classnames';

interface TableGridProps {
  rows: TableCell[][];
  actions: IconName[];
  isTableModified: boolean;
}

export const TableGrid = ({
  rows,
  actions,
  isTableModified,
}: TableGridProps) => {
  const dataCols = Math.max(...rows.map((r) => r.length));

  const template = [
    'minmax(0,2fr)',
    ...(dataCols > 1 ? Array(dataCols - 1).fill('96px') : []),
    'auto',
  ].join(' ');

  return (
    <TooltipProvider delayDuration={300}>
      {rows.map((cellsInRow, rowIdx) => (
        <ul
          key={rowIdx}
          className="
            grid items-center gap-2
            w-full px-6 py-4 bg-white border-b border-opacity-10
          "
          style={{ gridTemplateColumns: template }}
        >
          {cellsInRow.map((cell, colIdx) => (
            <li
              key={colIdx}
              className={classnames(
                'flex items-center text-sm tracking-normal h-6',
                colIdx === 0 ? 'font-medium' : 'font-normal',
              )}
            >
              <TableCellItem cell={cell} />
            </li>
          ))}

          <li className="flex items-center justify-center gap-2">
            {actions.map((action, k) => (
              <button
                key={k}
                className={classnames(
                  'p-[2px] rounded',
                  isTableModified &&
                    'hover:text-btn-primary-hover cursor-pointer transition',
                )}
              >
                <RenderIcon iconName={action} className="h-4 w-4" />
              </button>
            ))}
          </li>
        </ul>
      ))}
    </TooltipProvider>
  );
};
