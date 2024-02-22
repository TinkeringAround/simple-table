import { Table } from './table/table.webcomponent';
import { CellElement } from './cell/cell.webcomponent';

export * from './table';
export * from './cell';

export const define = () => {
  customElements.define(Table.tag, Table);
  customElements.define(CellElement.tag, CellElement);
};
