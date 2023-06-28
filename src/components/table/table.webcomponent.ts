import { WebComponent } from "../webcomponent";
import { Coordinates } from "./cell/coordinates";
import { Cell } from "./cell/model";
import { createCells } from "./elements";
import { TableCellValueChangedEvent } from "./events";
import { Row, TableConfig } from "./model";
import { createTableStyles, getDynamicTableStyles } from "./table.styles";

export class Table<T extends string = "default"> extends WebComponent {
  static tag = "wc-table";

  table: HTMLTableElement;
  dynamicStyles: HTMLStyleElement;

  private _config: TableConfig = {
    columns: ["1fr"],
    rows: ["1fr"],
  };
  private _rows: Row<T>[] = [];

  set config(config: TableConfig) {
    this._config = config;
    this.update();
  }

  get config() {
    return this._config;
  }

  set rows(rows: Row<T>[]) {
    this._rows = rows;
    this.update();
  }

  get rows() {
    return this._rows;
  }

  constructor() {
    super();

    this.dynamicStyles = document.createElement("style");
    this.table = document.createElement("table");

    this.attachShadow({ mode: "closed" }).append(
      createTableStyles(),
      this.dynamicStyles,
      this.table
    );
  }

  connectedCallback() {
    this.update();
  }

  update() {
    this.dynamicStyles.innerHTML = getDynamicTableStyles(this.config);
    this.table.replaceChildren(
      ...createCells(this.rows, (cell: Cell<T>, coordinates: Coordinates) =>
        this.onCellValueChange(cell, coordinates)
      )
    );
  }

  onCellValueChange(cell: Cell<T>, coordinates: Coordinates) {
    this.dispatchEvent(new TableCellValueChangedEvent(cell, coordinates));
  }

  static create<T extends string = "default">(
    config: TableConfig,
    rows: Row<T>[] = []
  ) {
    const table = document.createElement(Table.tag) as Table<T>;
    table.config = config;
    table.rows = rows;

    return table;
  }
}
