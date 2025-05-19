'use client';

import { RenderIcon } from '@/components/ui';
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
    ...Array.from(
      { length: Math.max(dataCols - 1, 0) },
      () => 'minmax(96px,max-content)',
    ),
    'auto',
  ].join(' ');

  return (
    <>
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
              <div className="inline-flex items-center gap-2">
                {cell.icon && (
                  <RenderIcon iconName={cell.icon} className="h-4 w-4" />
                )}
                <span>{cell.name}</span>
              </div>
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
    </>
  );
};
