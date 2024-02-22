import { Coordinates, Cell } from '../cell';

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
