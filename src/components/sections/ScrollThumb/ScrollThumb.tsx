interface ScrollThumbProps {
  height: number;
  top: number;
  onDragStart: React.MouseEventHandler<HTMLDivElement>;
}

export const ScrollThumb = ({ height, top, onDragStart }: ScrollThumbProps) => (
  <div
    onMouseDown={onDragStart}
    className="absolute w-full rounded cursor-pointer
               bg-scroll-thumb hover:bg-scroll-thumb-hover
               active:bg-scroll-thumb-hover"
    style={{ height: `${height}px`, top: `${top}px` }}
  />
);
