'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { ScrollBarContainer } from '../ScrollBarContainer';

export const PromptField = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState('');
  const isBtnActive = prompt.trim().length > 0;

  return (
    <div className="absolute flex w-[280px] h-[230px] bg-white rounded-[12px_28px_28px] shadow-soft-lg">
      <ScrollBarContainer
        scrollAreaRef={textAreaRef}
        className="relative flex-col p-3"
      >
        <textarea
          ref={textAreaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="
            w-full flex-1 text-sm leading-[24px] tracking-normal resize-none text-foreground
            placeholder-placeholder focus:outline-none caret-caret scrollbar-hidden
          "
          placeholder="What kind of table do you want to generate?"
        />
        <div className="flex justify-end pt-3">
          <button
            className={clsx(
              'w-10 h-10 rounded-full flex items-center justify-center transition',
              isBtnActive
                ? 'bg-btn-primary hover:bg-btn-primary-hover cursor-pointer'
                : 'bg-btn-primary-disabled cursor-not-allowed',
            )}
            disabled={!isBtnActive}
          >
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
          </button>
        </div>
      </ScrollBarContainer>
    </div>
  );
};
