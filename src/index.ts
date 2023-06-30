import { Table } from './table/table.webcomponent';
import { CellElement } from './cell/cell.webcomponent';

export * from './table/table.webcomponent';
export * from './cell/cell.webcomponent';

export const define = () => {
  customElements.define(Table.tag, Table);
  customElements.define(CellElement.tag, CellElement);
};
