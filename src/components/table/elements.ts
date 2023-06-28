import { CellElement } from "./cell/cell.webcomponent";
import { Coordinates } from "./cell/coordinates";
import { CellEvents, CellValueChangedEvent } from "./cell/events";
import { Cell } from "./cell/model";
import { Row } from "./model";

export const createCells = <T extends string = "default">(
  rows: Row<T>[],
  onValueChange: (cell: Cell<T>, coordinates: Coordinates) => void = () => {}
) => {
  const cells: CellElement<T>[] = [];
  rows.forEach((rowCells, x) => {
    rowCells.map((cell, y) => {
      const cellElement = CellElement.create<T>(cell, x, y);

      if (cell.editable) {
        cellElement.addEventListener(CellEvents.valueChanged, (event) => {
          const { cell, coordinates } = (event as CellValueChangedEvent).detail;
          onValueChange(cell as Cell<T>, coordinates);
        });
      }

      cells.push(cellElement);
    });
  });

  return cells;
};
