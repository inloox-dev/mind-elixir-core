import type { DivData } from '../customLink'
import type { NodeObj, MindElixirInstance, NodeObjExport } from '../types/index'

export function encodeHTML(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

export const isMobile = (): boolean => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const getObjById = function (id: string, data: NodeObj): NodeObj | null {
  if (data.id === id) {
    return data
  } else if (data.children && data.children.length) {
    for (let i = 0; i < data.children.length; i++) {
      const res = getObjById(id, data.children[i])
      if (res) return res
    }
    return null
  } else {
    return null
  }
}

/**
 * Add parent property to every node
 */
export const fillParent = (data: NodeObj, parent?: NodeObj) => {
  data.parent = parent
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      fillParent(data.children[i], data)
    }
  }
}

export function refreshIds(data: NodeObj) {
  data.id = generateUUID()
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      refreshIds(data.children[i])
    }
  }
}

export const throttle = (fn: (...args: any[]) => void, wait: number) => {
  let pre = Date.now()
  return function (...args: any[]) {
    const now = Date.now()
    if (now - pre >= wait) {
      fn(...args)
      pre = Date.now()
    }
  }
}

export function getArrowPoints(p3x: number, p3y: number, p4x: number, p4y: number) {
  const deltay = p4y - p3y
  const deltax = p3x - p4x
  let angle = (Math.atan(Math.abs(deltay) / Math.abs(deltax)) / 3.14) * 180
  if (deltax < 0 && deltay > 0) {
    angle = 180 - angle
  }
  if (deltax < 0 && deltay < 0) {
    angle = 180 + angle
  }
  if (deltax > 0 && deltay < 0) {
    angle = 360 - angle
  }
  const arrowLength = 15
  const arrowAngle = 30
  const a1 = angle + arrowAngle
  const a2 = angle - arrowAngle
  return {
    x1: p4x + Math.cos((Math.PI * a1) / 180) * arrowLength,
    y1: p4y - Math.sin((Math.PI * a1) / 180) * arrowLength,
    x2: p4x + Math.cos((Math.PI * a2) / 180) * arrowLength,
    y2: p4y - Math.sin((Math.PI * a2) / 180) * arrowLength,
  }
}

export function generateUUID(): string {
  return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16)
}

export const generateNewObj = function (this: MindElixirInstance): NodeObjExport {
  const id = generateUUID()
  return {
    topic: this.newTopicName,
    id,
  }
}

export function checkMoveValid(from: NodeObj, to: NodeObj) {
  let valid = true
  while (to.parent) {
    if (to.parent === from) {
      valid = false
      break
    }
    to = to.parent
  }
  return valid
}

const getSibling = (obj: NodeObj): { siblings: NodeObj[]; index: number } => {
  const siblings = obj.parent?.children as NodeObj[]
  const index = siblings.indexOf(obj)
  return { siblings, index }
}

export function moveUpObj(obj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  const t = siblings[index]
  if (index === 0) {
    siblings[index] = siblings[siblings.length - 1]
    siblings[siblings.length - 1] = t
  } else {
    siblings[index] = siblings[index - 1]
    siblings[index - 1] = t
  }
}

export function moveDownObj(obj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  const t = siblings[index]
  if (index === siblings.length - 1) {
    siblings[index] = siblings[0]
    siblings[0] = t
  } else {
    siblings[index] = siblings[index + 1]
    siblings[index + 1] = t
  }
}

export function removeNodeObj(obj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings.splice(index, 1)
  return siblings.length
}

export function insertNodeObj(obj: NodeObj, newObj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings.splice(index + 1, 0, newObj)
}

export function insertBeforeNodeObj(obj: NodeObj, newObj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings.splice(index, 0, newObj)
}

export function insertParentNodeObj(obj: NodeObj, newObj: NodeObj) {
  const { siblings, index } = getSibling(obj)
  siblings[index] = newObj
  newObj.children = [obj]
}

export function moveNodeObj(from: NodeObj, to: NodeObj) {
  removeNodeObj(from)
  if (to.children) to.children.push(from)
  else to.children = [from]
}

export function moveNodeBeforeObj(from: NodeObj, to: NodeObj) {
  removeNodeObj(from)
  const { siblings, index } = getSibling(to)
  siblings.splice(index, 0, from)
}

export function moveNodeAfterObj(from: NodeObj, to: NodeObj) {
  removeNodeObj(from)
  const { siblings, index } = getSibling(to)
  siblings.splice(index + 1, 0, from)
}

export function deepClone(obj: NodeObj) {
  const deepCloneObj = JSON.parse(
    JSON.stringify(obj, (k, v) => {
      if (k === 'parent') return undefined
      return v
    })
  )
  return deepCloneObj
}

export const getOffsetLT = (parent: HTMLElement, child: HTMLElement) => {
  let offsetLeft = 0
  let offsetTop = 0
  while (child && child !== parent) {
    offsetLeft += child.offsetLeft
    offsetTop += child.offsetTop
    child = child.offsetParent as HTMLElement
  }
  return { offsetLeft, offsetTop }
}

export const setAttributes = (el: HTMLElement | SVGElement, attrs: { [key: string]: string }) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}
