import { CellAttributes, CellElement, Table, TableCellClickedEvent, TableEvents } from '../../../../src';
import { createStyles } from './style';

export default class SimpleTableDemo extends HTMLElement {
  static readonly tag = 'simple-table-demo';

  readonly table: Table<'default' | 'header'>;

  static define() {
    customElements.define(SimpleTableDemo.tag, SimpleTableDemo);
  }

  constructor() {
    super();

    this.table = Table.create<'default' | 'header'>(
      {
        columns: ['1fr', '1fr', '1fr', '1fr'],
        rows: ['min-content', '1fr', '1fr', '1fr'],
      },
      [
        [
          {
            type: 'header',
            value: 'Column 1',
          },
          {
            type: 'header',
            value: 'Column 2',
          },
          {
            type: 'header',
            value: 'Column 3',
          },
          {
            type: 'header',
            value: 'Column 4',
          },
        ],
        [
          {
            type: 'default',
            value: '10 & Editable & Span 4 Columns',
            editable: true,
            columnSpan: '4',
            part: 'columnspan',
          },
        ],
        [
          { type: 'default', value: '20 & part "blue" = blue background', part: 'blue', columnSpan: '3' },

          { type: 'default', value: '21 & clickable', rowSpan: '2', part: 'rowspan', clickable: true },
        ],
        [
          { type: 'default', value: '30' },
          { type: 'default', value: '31' },
          { type: 'default', value: '32' },
        ],
      ],
      `
    table {
      gap: 1rem 0;
    }

    ${CellElement.tag} {
      min-height: 60px;
      padding: 0 1rem;

      justify-content: center;
      align-items: center;
    }

    ${CellElement.tag}:hover {
      background: rgba(242, 242, 250, 0.8);
      color: var(--blue);
    }

    ${CellElement.tag}[type="header"] {
      min-height: 35px;

      background: var(--light);
      color: var(--medium);

      font-weight: bold;
      font-size: 0.8rem;
    }

    ${CellElement.tag}[type="header"]:hover {
      color: var(--blue);
    }

    ${CellElement.tag}[type="header"][${CellAttributes.isFirstInRow}] {
      border-radius: 5px 0 0 5px;
     }

     ${CellElement.tag}[type="header"][${CellAttributes.isLastInRow}] {
      border-radius: 0 5px 5px 0;
     }

    [part="columnspan"] {
      background: red;
    }

    [part="blue"] {
      background: rgba(36, 28, 194, 0.3);
    }

    [part="rowspan"] {
      background: green;
    }
    `,
    );

    this.table.addEventListener(TableEvents.cellClicked, (event) => {
      const { cell, coordinates } = (event as TableCellClickedEvent).detail;

      window.alert(['CLICKED CELL', coordinates.toString(), JSON.stringify(cell)].join('\n'));
    });
    this.attachShadow({ mode: 'closed' }).append(createStyles(), this.table);
  }
}
