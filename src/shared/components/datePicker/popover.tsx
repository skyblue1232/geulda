import * as PopoverPrimitive from '@radix-ui/react-popover';
import dynamic from 'next/dynamic';

export function Popover(
  props: React.ComponentProps<typeof PopoverPrimitive.Root>,
) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

export function PopoverTrigger(
  props: React.ComponentProps<typeof PopoverPrimitive.Trigger>,
) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

export function PopoverAnchor(
  props: React.ComponentProps<typeof PopoverPrimitive.Anchor>,
) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export const PopoverContent = dynamic(
  () =>
    import('./PopoverContent.client').then((m) => ({
      default: m.PopoverContent,
    })),
  { ssr: false },
);
