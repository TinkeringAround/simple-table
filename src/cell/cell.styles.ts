import { HasSpan, CellParts } from './model';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);

    min-width: 50px;
    height: 100%;
    width: 100%;

    transition: all 0.15s ease-in-out;
    box-sizing: border-box;
}

span[part="${CellParts.value}"] {
    display: grid;
    justify-content: inherit;
    align-items: inherit;

    height: inherit;
    width: inherit;

    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    border-radius: inherit;
    border: inherit;
    outline: inherit;

    transition: inherit;
    cursor: default;
}

span[part="${CellParts.value}"][contenteditable] {
    cursor: text;
}
</style>`;

export const createCellStyles = () => {
  return template.content.cloneNode(true);
};

export const getDynamicCellStyles = ({ columnSpan = '1', rowSpan = '1' }: HasSpan) => `
:host {
    grid-column: span ${columnSpan};
    grid-row: span ${rowSpan};
}
`;
