import { Coordinates } from '../cell/coordinates';
import { Cell } from '../cell/model';

export enum TableEvents {
  cellValueChanged = '[TABLE] Cell Value Changed',
}

export class TableCellValueChangedEvent<T extends string = 'default'> extends CustomEvent<{
  cell: Cell<T>;
  coordinates: Coordinates;
}> {
  constructor(cell: Cell<T>, coordinates: Coordinates) {
    super(TableEvents.cellValueChanged, {
      detail: { cell, coordinates },
    });
  }
}
