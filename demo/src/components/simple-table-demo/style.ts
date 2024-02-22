const template = document.createElement('template');
template.innerHTML = `
<style>
 :host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
 }
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
