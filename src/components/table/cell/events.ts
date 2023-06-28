import { Cell } from "./model";

export enum CellEvents {
  valueChanged = "[CELL] Value Changed",
}

export class CellValueChangedEvent<
  T extends string = "default"
> extends CustomEvent<Cell<T>> {
  constructor(cell: Cell<T>) {
    super(CellEvents.valueChanged, {
      detail: cell,
    });
  }
}
