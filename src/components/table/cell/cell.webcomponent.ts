import { WebComponent } from "../../webcomponent";
import { createCellStyles, getDynamicCellStyles } from "./cell.styles";
import { CellValueChangedEvent } from "./events";
import { Cell, CellAttributes, CellParts } from "./model";

export class CellElement<T extends string = "default"> extends WebComponent {
  static tag = "wc-cell";

  spanElement: HTMLSpanElement;
  dynamicStyles: HTMLStyleElement;

  private _cell: Cell<T> = { type: "default", value: "" } as Cell<T>;
  private mutationObserver = new MutationObserver((mutations) =>
    this.onChange(mutations)
  );

  set cell(cell: Cell<T>) {
    this._cell = cell;
  }

  get cell() {
    return this._cell;
  }

  set coordinates(coordinates: string) {
    this.setAttribute(CellAttributes.coordinates, coordinates);
  }

  get coordinates() {
    return this.getAttribute(CellAttributes.coordinates) ?? "";
  }

  constructor() {
    super();

    this.spanElement = document.createElement("span");
    this.dynamicStyles = document.createElement("style");

    this.spanElement.setAttribute("part", CellParts.value);

    this.attachShadow({ mode: "closed" }).append(
      createCellStyles(),
      this.dynamicStyles,
      this.spanElement
    );
  }

  connectedCallback() {
    this.setAttribute(CellAttributes.coordinates, this.coordinates);
    this.setAttribute("type", this.cell.type);

    if (this.cell.part) {
      this.setAttribute("part", this.cell.part);
    }

    this.update();
  }

  update() {
    const { value, editable } = this.cell;

    if (value) {
      this.spanElement.textContent = value;
    }

    if (editable) {
      this.spanElement.setAttribute("contenteditable", "");
      this.mutationObserver.observe(this.spanElement, {
        characterData: true,
        subtree: true,
      });
    }

    this.dynamicStyles.innerHTML = getDynamicCellStyles(this.cell);
  }

  private onChange(mutations: MutationRecord[]) {
    mutations.reverse().forEach((mutation) => {
      if (mutation.type === "characterData") {
        this.cell = {
          ...this.cell,
          value: mutation.target.textContent ?? "",
        };
        return;
      }
    });

    this.dispatchEvent(new CellValueChangedEvent(this.cell));
  }

  static create<T extends string = "default">(
    cell: Cell<T>,
    row: number,
    column: number
  ) {
    const cellElement = document.createElement(
      CellElement.tag
    ) as CellElement<T>;
    cellElement.cell = cell;
    cellElement.coordinates = `${row},${column}`;

    return cellElement;
  }
}
