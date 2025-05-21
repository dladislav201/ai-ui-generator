'use client';

import { useCallback, useState } from 'react';
import { PromptField, Table } from '@/components';
import { SYSTEM_PROMPT } from '@/data';
import { Table as TableModel } from '@/models';
import { useChat } from '@/hooks';

export const HomeComponent = () => {
  const [tableHistory, setTableHistory] = useState<TableModel[]>([
    {
      title: 'New table',
      cells: [
        [
          { name: 'Title', icon: 'ChartColumnIncreasing' },
          { name: 'Cell' },
          { name: 'Cell' },
          { name: 'Cell' },
        ],
      ],
      actions: ['Inbox', 'Trash2', 'MoreVertical'],
    },
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { send, loading, error } = useChat(SYSTEM_PROMPT);

  const handlePromptSubmit = async (prompt: string) => {
    try {
      const newTable = await send(prompt);
      setTableHistory((prev) => {
        const next = [...prev, newTable];
        setCurrentIdx(next.length - 1);
        return next;
      });
    } catch {}
  };

  const jumpTo = useCallback((idx: number) => {
    setCurrentIdx(idx);
  }, []);

  return (
    <div className="relative flex w-full p-3">
      <PromptField
        onSubmit={handlePromptSubmit}
        loading={loading}
        error={error}
        jumpTo={jumpTo}
        tableHistory={tableHistory}
        currentIdx={currentIdx}
      />
      <Table
        data={tableHistory[currentIdx]}
        loading={loading}
        isTableModified={currentIdx !== 0}
      />
    </div>
  );
};
