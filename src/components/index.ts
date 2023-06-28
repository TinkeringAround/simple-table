import { App } from "./app/app.webcomponent";
import { CellElement } from "./table/cell/cell.webcomponent";
import { Table } from "./table/table.webcomponent";

// Define custom Elements here
customElements.define(App.tag, App);
customElements.define(Table.tag, Table);
customElements.define(CellElement.tag, CellElement);
