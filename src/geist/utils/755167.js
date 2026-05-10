export function getActiveElement(doc = document) {
  return doc.activeElement
}

export function getEventTarget(event) {
  return event.target
}

export function nodeContains(parent, child) {
  return !!parent && !!child && parent.contains(child)
}
