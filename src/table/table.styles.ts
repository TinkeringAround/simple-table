import { TableConfig } from './model';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}

table {
    display: grid;
}
</style>`;

export const createTableStyles = () => {
  return template.content.cloneNode(true);
};

export const getDynamicTableStyles = ({ columns, rows = ['repeat(auto-fill, 50px)'] }: TableConfig) => `
table {
    grid-template-columns: ${columns.join(' ')};
    grid-template-rows: ${rows.join(' ')};
}
`;
