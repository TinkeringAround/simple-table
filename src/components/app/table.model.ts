import { TableConfig, Row } from "../table/model";

export type CellTypes = "default" | "empty" | "header";

export const CONFIG: TableConfig = {
  columns: ["repeat(3, 1fr)"],
  rows: ["60px", "repeat(auto-fill, 40px)"],
};

export const ROWS: Row<CellTypes>[] = [
  [
    { type: "header", value: "Column 1", editable: true },
    { type: "header", value: "Column 2" },
    { type: "header", value: "Column 3" },
  ],
  [
    { type: "default", value: "11" },
    { type: "default", value: "12" },
    { type: "default", value: "13" },
  ],
  [
    {
      type: "default",
      value: "21 Span 3",
      columnSpan: "3",
    },
  ],
  [
    { type: "empty" },
    {
      type: "default",
      value: "32 span 2",
      columnSpan: "2",
    },
  ],
  [
    {
      type: "default",
      value: "41 span 2 rows",
      rowSpan: "2",
    },
  ],
  [],
];
