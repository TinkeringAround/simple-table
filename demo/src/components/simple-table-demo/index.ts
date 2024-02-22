import { CellAttributes, CellElement, Table } from '../../../../src';
import { createStyles } from './style';

export default class SimpleTableDemo extends HTMLElement {
  static readonly tag = 'simple-table-demo';

  static define() {
    customElements.define(SimpleTableDemo.tag, SimpleTableDemo);
  }

  constructor() {
    super();

    const table = document.createElement(Table.tag) as Table<'default' | 'header'>;
    table.config = {
      columns: ['1fr', '1fr', '1fr', '1fr'],
      rows: ['min-content', '1fr', '1fr', '1fr'],
    };
    table.rows = [
      [
        {
          type: 'header',
          value: 'Colum 1',
        },
        {
          type: 'header',
          value: 'Colum 2',
        },
        {
          type: 'header',
          value: 'Colum 3',
        },
        {
          type: 'header',
          value: 'Colum 4',
        },
      ],
      [
        {
          type: 'default',
          value: '11 & Editable & Span 4 Columns',
          editable: true,
          columnSpan: '4',
          part: 'columnspan',
        },
      ],
      [
        { type: 'default', value: '21 & part "blue" = blue background', part: 'blue', columnSpan: '3' },

        { type: 'default', value: '22', rowSpan: '2', part: 'rowspan' },
      ],
      [
        { type: 'default', value: '31' },
        { type: 'default', value: '32' },
        { type: 'default', value: '33' },
      ],
    ];
    table.customStyles = `
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
    `;

    this.attachShadow({ mode: 'closed' }).append(createStyles(), table);
  }
}
