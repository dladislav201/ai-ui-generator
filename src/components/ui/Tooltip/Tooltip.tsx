'use client';

import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import classnames from 'classnames';

export const TooltipProvider = RadixTooltip.Provider;

export const Tooltip = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={sideOffset}
    className={classnames(
      'z-999 overflow-hidden rounded-xl px-3 py-1.5',
      'shadow-lg will-change-[opacity,transform]',
      'bg-neutral-900 text-foreground',
      'text-sm leading-tight',
      'data-[side=top]:animate-slideDownAndFade',
      'data-[side=right]:animate-slideLeftAndFade',
      'data-[side=bottom]:animate-slideUpAndFade',
      'data-[side=left]:animate-slideRightAndFade',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = RadixTooltip.Content.displayName;
