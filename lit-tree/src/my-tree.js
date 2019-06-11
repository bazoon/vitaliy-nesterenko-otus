import { html, LitElement, property } from "lit-element";

class MyTree extends LitElement {
  @property({ type: Array }) tree;
  @property({ type: Number }) level;
  render() {
    const level = this.level ? this.level + 20 : 0;

    return html`
      ${this.tree.map(
        t =>
          html`
            <my-leaf level="${level}" item="${JSON.stringify(t)}"></my-leaf>
          `
      )}
    `;
  }
}

customElements.define("my-tree", MyTree);
