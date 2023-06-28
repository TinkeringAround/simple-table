import { WebComponent } from "../webcomponent";
import { Table } from "../table/table.webcomponent";
import { CellTypes, CONFIG, ROWS } from "./table.model";

export class App extends WebComponent {
  static tag = "wc-app";

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      Table.create<CellTypes>(CONFIG, ROWS)
    );
  }
}
