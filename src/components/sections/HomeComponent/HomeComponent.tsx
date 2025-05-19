'use client';

import { useState } from 'react';
import { PromptField, Table } from '@/components';
import { SYSTEM_PROMPT } from '@/data';
import { Table as TableModel } from '@/models';
import { useChat } from '@/hooks';

export const HomeComponent = () => {
  const [tableData, setTableData] = useState<TableModel>({
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
  });
  const [isTableModified, setIsTableModified] = useState(false);
  const { send, loading, error } = useChat(SYSTEM_PROMPT);

  const handlePromptSubmit = async (prompt: string) => {
    try {
      const result = await send(prompt);
      setTableData(result);
      setIsTableModified(true);
    } catch {}
  };

  return (
    <div className="relative flex w-full p-3">
      <PromptField
        onSubmit={handlePromptSubmit}
        loading={loading}
        error={error}
      />
      <Table
        data={tableData}
        loading={loading}
        isTableModified={isTableModified}
      />
    </div>
  );
};
