import { IconName } from './icons';

export interface TableCell {
  name: string;
  icon?: IconName;
}

export interface Table {
  title: string;
  cells: TableCell[][];
  actions: IconName[];
}
