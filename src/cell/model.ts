export enum CellAttributes {
  coordinates = 'coordinates',
  isFirstInRow = 'isFirstInRow',
  isLastInRow = 'isLastInRow',
}

export enum CellParts {
  value = 'cell-value',
}

export interface HasSpan {
  columnSpan?: string;
  rowSpan?: string;
}

export interface Cell<T extends string = 'default'> extends HasSpan {
  type: T;
  value?: string;

  editable?: boolean;

  part?: string;
}
