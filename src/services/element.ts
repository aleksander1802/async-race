interface AttributeCollection {
  [name: string]: string | boolean;
}

export function element<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: AttributeCollection | null,
  ...children: HTMLElement[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      const attributeValue = attributes[key];
      if (typeof attributeValue === 'boolean' && attributeValue) {
        element.setAttribute(key, '');
      } else {
        element.setAttribute(key, attributeValue as string);
      }
    }
  }

  for (const child of children) {
    element.append(child);
  }

  return element;
}
