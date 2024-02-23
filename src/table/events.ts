import { Coordinates, Cell } from '../cell';

export enum TableEvents {
  cellClicked = '[TABLE] Cell Clicked',
  cellValueChanged = '[TABLE] Cell Value Changed',
}

export interface CellEventPayload<T extends string = 'default'> {
  cell: Cell<T>;
  coordinates: Coordinates;
}

export class TableCellClickedEvent<T extends string = 'default'> extends CustomEvent<CellEventPayload<T>> {
  constructor(cell: Cell<T>, coordinates: Coordinates) {
    super(TableEvents.cellClicked, {
      detail: { cell, coordinates },
    });
  }
}

export class TableCellValueChangedEvent<T extends string = 'default'> extends CustomEvent<CellEventPayload<T>> {
  constructor(cell: Cell<T>, coordinates: Coordinates) {
    super(TableEvents.cellValueChanged, {
      detail: { cell, coordinates },
    });
  }
}
