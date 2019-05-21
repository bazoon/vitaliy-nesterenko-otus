function getPath(element) {
  let parentElement = element.parentElement;
  let path = [];
  while (element && element.tagName !== "BODY") {
    const id = element.id;
    const klass = element.className;
    const tag = element.tagName;
    let selector;

    if (id) {
      selector = `#${id}`;
    } else if (klass) {
      selector = `.${klass}`;
    } else {
      selector = `${tag}`;
    }

    const parentElement = element.parentElement;

    if (parentElement && parentElement.childElementCount > 1) {
      const childIndex = Array.prototype.indexOf.call(
        parentElement.children,
        element
      );

      selector += `:nth-child(${childIndex + 1})`;
    }

    path.unshift(selector);

    element = parentElement;
  }

  return path.join(" ");
}

// Example
const element = document.querySelector(".chosen:nth-child(8)");
const path = getPath(element);

console.log(path);
console.log(document.querySelectorAll(path));
