class MyLeaf extends HTMLElement {
  static get observedAttributes() {
    return ["leaf"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const leaf = JSON.parse(newValue);
    const level = +this.level;

    this.innerHTML = `<div style="padding-left: ${level * 20}px">Leaf${
      leaf.id
    }</div>`;
  }

  get leaf() {
    return this.getAttribute("leaf");
  }

  set leaf(value) {
    this.setAttribute("leaf", value);
  }

  get level() {
    return this.getAttribute("level");
  }

  set level(value) {
    this.setAttribute("level", value);
  }
}

class MyTree extends HTMLElement {
  static get observedAttributes() {
    return ["tree"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const tree = JSON.parse(newValue);
    const level = +this.level;

    if (tree.items) {
      const items = tree.items.map(
        child =>
          `<my-tree level=${level + 1} tree=${JSON.stringify(child)}></my-tree>`
      );
      this.innerHTML = `
        <div style="padding-left: ${level * 20}px">Tree${tree.id}</div>
      `;

      items.forEach(item => (this.innerHTML += item));
    } else {
      this.innerHTML = `<my-leaf level=${level} leaf=${newValue}></my-leaf>`;
    }
  }

  get tree() {
    return this.getAttribute("tree");
  }

  set tree(value) {
    this.setAttribute("tree", value);
  }

  get level() {
    return this.getAttribute("level");
  }

  set level(value) {
    this.setAttribute("level", value);
  }
}

window.customElements.define("my-tree", MyTree);
window.customElements.define("my-leaf", MyLeaf);

const tree = {
  id: 1,
  items: [
    {
      id: 2,
      items: [
        {
          id: 3,
          items: [
            { id: 4 },
            { id: 5, items: [{ id: 9 }, { id: 10 }, { id: 11 }] }
          ]
        }
      ]
    },
    {
      id: 6
    },
    {
      id: 7,
      items: [{ id: 8 }]
    }
  ]
};

const t = document.querySelector("my-tree");
t.setAttribute("tree", JSON.stringify(tree));
