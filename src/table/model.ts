import { Cell } from '../cell';

export interface TableConfig {
  columns: string[];
  rows: string[];
}

export type Row<T extends string = 'default'> = Cell<T>[];
