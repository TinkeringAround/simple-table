import { CellElement } from "./cell/cell.webcomponent";
import { CellEvents, CellValueChangedEvent } from "./cell/events";
import { Cell } from "./cell/model";
import { Row } from "./model";

export const createCells = <T extends string = "default">(rows: Row<T>[]) => {
  const cells: CellElement<T>[] = [];
  rows.forEach((rowCells, x) => {
    rowCells.map((cell, y) => {
      const cellElement = CellElement.create<T>(cell, x, y);

      if (cell.editable) {
        cellElement.addEventListener(CellEvents.valueChanged, (event) => {
          console.log(
            ((event as CellValueChangedEvent).detail as Cell<T>).value
          );
        });
      }

      cells.push(cellElement);
    });
  });

  return cells;
};
