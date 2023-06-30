import { Coordinates } from './coordinates';
import { Cell } from './model';

export enum CellEvents {
  valueChanged = '[CELL] Value Changed',
}

export class CellValueChangedEvent<T extends string = 'default'> extends CustomEvent<{
  cell: Cell<T>;
  coordinates: Coordinates;
}> {
  constructor(cell: Cell<T>, coordinates: Coordinates) {
    super(CellEvents.valueChanged, {
      detail: { cell, coordinates },
    });
  }
}
