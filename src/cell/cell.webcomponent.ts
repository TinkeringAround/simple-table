import { createCellStyles, getDynamicCellStyles } from './cell.styles';
import { Coordinates } from './coordinates';
import { CellValueChangedEvent } from './events';
import { Cell, CellAttributes, CellParts } from './model';

export class CellElement<T extends string = 'default'> extends HTMLElement {
  static tag = 'wc-cell';

  spanElement: HTMLSpanElement;
  dynamicStyles: HTMLStyleElement;

  private _cell: Cell<T> = { type: 'default', value: '' } as Cell<T>;
  private mutationObserver = new MutationObserver((mutations) => this.onChange(mutations));

  set cell(cell: Cell<T>) {
    this._cell = cell;
  }

  get cell() {
    return this._cell;
  }

  set coordinates(coordinates: Coordinates) {
    this.setAttribute(CellAttributes.coordinates, coordinates.toString());
  }

  get coordinates() {
    return Coordinates.fromString(this.getAttribute(CellAttributes.coordinates) ?? '-1,-1');
  }

  constructor() {
    super();

    this.spanElement = document.createElement('span');
    this.dynamicStyles = document.createElement('style');

    this.spanElement.setAttribute('part', CellParts.value);

    this.attachShadow({ mode: 'closed' }).append(createCellStyles(), this.dynamicStyles, this.spanElement);
  }

  connectedCallback() {
    this.setAttribute(CellAttributes.coordinates, this.coordinates.toString());
    this.setAttribute('type', this.cell.type);

    if (this.cell.part) {
      this.setAttribute('part', this.cell.part);
    }

    this.update();
  }

  update() {
    const { value, editable } = this.cell;

    if (value) {
      this.spanElement.textContent = value;
    }

    if (editable) {
      this.spanElement.setAttribute('contenteditable', '');
      this.mutationObserver.observe(this.spanElement, {
        characterData: true,
        subtree: true,
      });
    }

    this.dynamicStyles.innerHTML = getDynamicCellStyles(this.cell);
  }

  private onChange(mutations: MutationRecord[]) {
    mutations.reverse().forEach((mutation) => {
      if (mutation.type === 'characterData') {
        this.cell = {
          ...this.cell,
          value: mutation.target.textContent ?? '',
        };
        return;
      }
    });

    this.dispatchEvent(new CellValueChangedEvent(this.cell, this.coordinates));
  }

  static create<T extends string = 'default'>(cell: Cell<T>, row: number, column: number) {
    const cellElement = document.createElement(CellElement.tag) as CellElement<T>;
    cellElement.cell = cell;
    cellElement.coordinates = new Coordinates(row, column);

    return cellElement;
  }
}
