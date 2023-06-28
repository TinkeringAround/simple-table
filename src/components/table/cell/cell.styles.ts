import { HasSpan, CellParts } from "./model";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);

    justify-content: center;
    align-items: center;

    min-width: 50px;
}

span[part="${CellParts.value}"] {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
}
</style>`;

export const createCellStyles = () => {
  return template.content.cloneNode(true);
};

export const getDynamicCellStyles = ({
  columnSpan = "1",
  rowSpan = "1",
}: HasSpan) => `
:host {
    grid-column:  span ${columnSpan};
    grid-row: span ${rowSpan};
}
`;
