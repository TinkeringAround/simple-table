import { Cell, CellElement, Coordinates, CellEvents, CellValueChangedEvent } from '../cell';
import { Row } from './model';

export const createCells = <T extends string = 'default'>(
  rows: Row<T>[],
  onValueChange?: (cell: Cell<T>, coordinates: Coordinates) => void,
) => {
  const cells: CellElement<T>[] = [];
  rows.forEach((rowCells, x) => {
    rowCells.map((rowCell, y) => {
      const cellElement = CellElement.create<T>(rowCell, x, y, y === rowCells.length - 1);

      if (rowCell.editable && onValueChange) {
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
