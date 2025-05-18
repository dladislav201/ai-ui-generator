export const MobileBlocker = () => (
  <div className="fixed inset-0 z-999 bg-background flex flex-col items-center justify-center block md:hidden">
    <p className="text-base text-foreground max-w-xs text-sl leading-[24px] tracking-normal text-center">
      Please open this application on a desktop device for the best experience.
    </p>
  </div>
);
