export function getOwnerDocument(node) {
  return node?.ownerDocument ?? document
}

export function getOwnerWindow(node) {
  if (node && 'window' in node && node.window === node) {
    return node
  }

  return getOwnerDocument(node).defaultView || window
}
