import { createCellStyles, getDynamicCellStyles } from './styles';
import { Coordinates } from './coordinates';
import { CellValueChangedEvent } from './events';
import { Cell, CellAttributes, CellParts } from './model';

export class CellElement<T extends string = 'default'> extends HTMLElement {
  static tag = 'wc-cell';

  spanElement: HTMLSpanElement;
  dynamicStyles: HTMLStyleElement;

  private _cell: Cell<T> = { type: 'default', value: '' } as Cell<T>;
  private mutationObserver = new MutationObserver((mutations) => this.onChange(mutations));

  public set cell(cell: Cell<T>) {
    this._cell = cell;
  }

  public get cell() {
    return this._cell;
  }

  public set coordinates(coordinates: Coordinates) {
    this.setAttribute(CellAttributes.coordinates, coordinates.toString());
  }

  public get coordinates() {
    return Coordinates.fromString(this.getAttribute(CellAttributes.coordinates) ?? '-1,-1');
  }

  public set isLastInRow(isLastInRow: boolean) {
    if (isLastInRow) {
      this.setAttribute(CellAttributes.isLastInRow, '');
    } else {
      this.removeAttribute(CellAttributes.isLastInRow);
    }
  }

  public get isLastInRow() {
    return !!this.getAttribute(CellAttributes.isLastInRow);
  }

  public get isFirstInRow() {
    return this.coordinates.y === 0;
  }

  static create<T extends string = 'default'>(cell: Cell<T>, row: number, column: number, isLastInRow: boolean) {
    const cellElement = document.createElement(CellElement.tag) as CellElement<T>;
    cellElement.cell = cell;
    cellElement.coordinates = new Coordinates(row, column);
    cellElement.isLastInRow = isLastInRow;

    return cellElement;
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

    if (this.isFirstInRow) {
      this.setAttribute(CellAttributes.isFirstInRow, '');
    }

    if (this.isLastInRow) {
      this.setAttribute(CellAttributes.isLastInRow, '');
    }

    this.update();
  }

  update() {
    const { value, editable, clickable } = this.cell;

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

    if (clickable) {
      this.spanElement.setAttribute('clickable', '');
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
}
