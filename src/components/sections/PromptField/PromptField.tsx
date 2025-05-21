'use client';

import React, { useRef, useState } from 'react';
import { ScrollBarContainer, Loader, TableVariantList } from '@/components';
import { AnimatePresence, motion } from 'framer-motion';
import { Table as TableModel } from '@/models';
import { ChatError } from '@/models';
import classnames from 'classnames';

interface PromptFieldProps {
  onSubmit: (prompt: string) => Promise<void>;
  error: ChatError | null;
  loading: boolean;
  jumpTo: (idx: number) => void;
  tableHistory: TableModel[];
  currentIdx: number;
}

export const PromptField = ({
  onSubmit,
  error,
  loading,
  jumpTo,
  tableHistory,
  currentIdx,
}: PromptFieldProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState('');
  const isBtnActive = prompt.trim().length > 0;

  const handleClick = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setPrompt('');
    try {
      await onSubmit(trimmed);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="z-1 absolute w-[280px]">
      <div className="z-1 flex w-full h-[230px] bg-white rounded-[12px_28px_28px] shadow-soft-lg">
        <ScrollBarContainer
          scrollAreaRef={textAreaRef}
          className="relative flex-col p-3"
        >
          <textarea
            ref={textAreaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
              w-full flex-1 text-sm leading-[24px] tracking-normal resize-none text-foreground
              placeholder-placeholder focus:outline-none caret-caret scrollbar-hidden p-2
            "
            disabled={loading}
            placeholder={
              loading
                ? 'Generating...'
                : 'What kind of table do you want to generate?'
            }
          />
          <div className="flex justify-end pt-3">
            <button
              className={classnames(
                'w-10 h-10 rounded-full flex items-center justify-center transition',
                isBtnActive || loading
                  ? 'bg-btn-primary'
                  : 'bg-btn-primary-disabled cursor-not-allowed',
                {
                  'hover:bg-btn-primary-hover cursor-pointer': isBtnActive,
                },
              )}
              onClick={handleClick}
              disabled={!isBtnActive && loading}
            >
              {loading ? (
                <Loader />
              ) : (
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.99952 14V1M5.99952 1L1 6M5.99952 1L11 6.00048"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </ScrollBarContainer>
      </div>
      {tableHistory.length > 2 && (
        <TableVariantList
          jumpTo={jumpTo}
          tableHistory={tableHistory}
          currentIdx={currentIdx}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.div
            className="z-0 p-5 mt-3 rounded-[28px] bg-[rgb(255_116_108)]/10 backdrop-blur-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm leading-[24px] tracking-normal text-error">
              {error.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
