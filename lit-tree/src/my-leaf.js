import { html, LitElement, property } from "lit-element";

class MyLeaf extends LitElement {
  @property({ type: Object }) item;
  @property({ type: Number }) level;
  render() {
    const level = this.level ? this.level + 20 : 20;

    return html`
      <h3 style="padding-left: ${level}px">${this.item.id}</h3>
      ${this.item.items &&
        html`
          <my-tree
            level="${level}"
            tree="${JSON.stringify(this.item.items)}"
          ></my-tree>
        `}
    `;
  }
}

customElements.define("my-leaf", MyLeaf);
