'use client';

import { RenderIcon } from '@/components/ui';
import { TableCell, IconName } from '@/models';
import classnames from 'classnames';
import React from 'react';

interface TableGridAdvancedProps {
  rows: TableCell[][];
  actions: IconName[];
  isTableModified: boolean;
}

export const TableGridAdvanced = ({
  rows,
  actions,
  isTableModified,
}: TableGridAdvancedProps) => {
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
    <div className="relative">
      <div className="rounded-group">
        <div
          className="
            relative
            grid w-full
            bg-white
            border-b border-opacity-10
            [&>*]:border-b [&>*]:border-opacity-10
          "
          style={{
            gridTemplateColumns: template,
            gridAutoRows: 'minmax(56px,auto)',
          }}
        >
          {rows.map((cellsInRow, rowIdx) => (
            <React.Fragment key={rowIdx}>
              {cellsInRow.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  className={classnames(
                    'flex items-center gap-2 px-1 text-sm tracking-normal',
                    colIdx === 0 ? 'font-medium' : 'font-normal',
                  )}
                >
                  {cell.icon && (
                    <RenderIcon iconName={cell.icon} className="h-4 w-4" />
                  )}
                  <span className="truncate">{cell.name}</span>
                </div>
              ))}

              <div className="flex items-center justify-center gap-2 px-1">
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
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs leading-[20px] font-light text-description text-center">
        The table uses padding instead of gap, but all cells remain equal — even
        if the content length varies.
      </p>
    </div>
  );
};
