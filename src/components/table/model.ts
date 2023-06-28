import { Cell } from "./cell/model";

export interface TableConfig {
  columns: string[];
  rows: string[];
}

export type Row<T extends string = "default"> = Cell<T>[];
