import "./my-tree.js";
import "./my-leaf.js";

const leaf = {
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

document.addEventListener("DOMContentLoaded", function() {
  const leafElement = document.querySelector("my-leaf");
  leafElement.item = leaf;
});
