import { Table } from './table/table';
import { CellElement } from './cell/cell';

export * from './table';
export * from './cell';

export const define = () => {
  customElements.define(Table.tag, Table);
  customElements.define(CellElement.tag, CellElement);
};
