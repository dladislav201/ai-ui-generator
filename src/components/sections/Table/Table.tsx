'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Table as TableModel } from '@/models';
import { TableGrid } from '@/components';
import classnames from 'classnames';

interface TableProps {
  data: TableModel;
  loading: boolean;
  isTableModified: boolean;
}

export const Table = ({ data, loading, isTableModified }: TableProps) => {
  const { title, cells, actions } = data;

  return (
    <div className="z-0 flex items-center justify-center w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(cells)}
          className="min-w-[640px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: loading ? 'blur(8px)' : 'blur(0px)',
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-2 text-xs leading-[20px] font-light text-description">
            {title}
          </h2>
          <div
            className={classnames('rounded-group', {
              'opacity-70': !isTableModified,
            })}
          >
            <TableGrid
              rows={cells}
              actions={actions}
              isTableModified={isTableModified}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
