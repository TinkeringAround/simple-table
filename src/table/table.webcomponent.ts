import { Coordinates, Cell, CellElement } from '../cell';
import { createCell, createCells } from './elements';
import { TableCellClickedEvent, TableCellValueChangedEvent } from './events';
import { Row, TableConfig } from './model';
import { createTableStyles, getDynamicTableStyles } from './table.styles';

export class Table<T extends string = 'default'> extends HTMLElement {
  static tag = 'wc-table';

  private table: HTMLTableElement;
  private dynamicStyleElement: HTMLStyleElement;
  private customStyleElement: HTMLStyleElement;

  private _config: TableConfig = {
    columns: ['1fr'],
    rows: ['1fr'],
  };
  private _rows: Row<T>[] = [];
  private _customStyles: string = '';

  private set config(config: TableConfig) {
    this._config = config;
  }

  public get config() {
    return this._config;
  }

  private set rows(rows: Row<T>[]) {
    this._rows = [...rows];
  }

  public get rows() {
    return this._rows;
  }

  private set customStyles(customStyles: string) {
    this._customStyles = customStyles;
  }

  public get customStyles() {
    return this._customStyles;
  }

  constructor() {
    super();

    this.dynamicStyleElement = document.createElement('style');
    this.customStyleElement = document.createElement('style');
    this.table = document.createElement('table');

    this.attachShadow({ mode: 'closed' }).append(
      createTableStyles(),
      this.dynamicStyleElement,
      this.customStyleElement,
      this.table,
    );
  }

  public connectedCallback() {
    this.restyle();
    this.redraw();
  }

  public updateConfig(config: TableConfig) {
    this.config = config;
    this.restyle();
  }

  public updateCell(cell: Cell<T>, coordinates: Coordinates) {
    this.rows[coordinates.x][coordinates.y] = { ...cell };

    const oldChild = ([...this.table.childNodes]).find((cellElement) => {
      const { x, y } = (cellElement as CellElement<T>).coordinates;

      if (coordinates.x === x && coordinates.y === y) {
        return cellElement;
      }
    });

    console.log(this.table, this.table.children, oldChild);

    if (oldChild) {
      this.table.replaceChild(createCell(cell, coordinates, (oldChild as CellElement<T>).isLastInRow,
        (cell: Cell<T>, coordinates: Coordinates) => this.onCellClick(cell, coordinates),
        (cell: Cell<T>, coordinates: Coordinates) => this.onCellValueChange(cell, coordinates)),
        oldChild
      );
    }
  }

  public updateModel(rows: Row<T>[]) {
    this.rows = rows;
    this.redraw();
  }

  public injectCustomStyles(customStyles: string) {
    this.customStyles = customStyles;
    this.restyle();
  }

  private restyle() {
    this.dynamicStyleElement.innerHTML = getDynamicTableStyles(this.config);
    this.customStyleElement.innerHTML = this.customStyles;
  }

  private redraw() {
    this.table.replaceChildren(
      ...createCells(
        this.rows,
        (cell: Cell<T>, coordinates: Coordinates) => this.onCellClick(cell, coordinates),
        (cell: Cell<T>, coordinates: Coordinates) => this.onCellValueChange(cell, coordinates),
      ),
    );
  }

  private onCellClick(cell: Cell<T>, coordinates: Coordinates) {
    this.dispatchEvent(new TableCellClickedEvent(cell, coordinates));
  }

  private onCellValueChange(cell: Cell<T>, coordinates: Coordinates) {
    this.dispatchEvent(new TableCellValueChangedEvent(cell, coordinates));
  }

  static create<T extends string = 'default'>(config: TableConfig, rows: Row<T>[] = [], customStyles?: string) {
    const table = document.createElement(Table.tag) as Table<T>;
    table.config = config;
    table.rows = rows;

    if (customStyles) {
      table.customStyles = customStyles;
    }

    return table;
  }
}
