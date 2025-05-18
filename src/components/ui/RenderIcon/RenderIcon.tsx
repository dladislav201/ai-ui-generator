import * as Icons from 'lucide-react';
import { IconName } from '@/models';

interface RenderIconProps {
  iconName: IconName;
  className?: string;
}

export const RenderIcon = ({ iconName, className }: RenderIconProps) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};
