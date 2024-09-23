import type { LinkItem } from '../customLink'
import type { Summary } from '../summary'
import type { NodeObj } from '../types/index'

type NodeOperation =
  | {
      name: 'moveNode' | 'moveDownNode' | 'moveUpNode' | 'copyNode' | 'addChild' | 'insertParent' | 'insertBefore' | 'insertSibling' | 'beginEdit'
      obj: NodeObj
    }
  | {
      name: 'reshapeNode'
      obj: NodeObj
      origin: NodeObj
    }
  | {
      name: 'finishEdit'
      obj: NodeObj
      origin: string
    }
  | {
      name: 'moveNodeAfter' | 'moveNodeBefore' | 'moveNode'
      obj: NodeObj
      toObj: NodeObj
      originParentId?: string
    }
  | {
      name: 'removeNode'
      obj: NodeObj
      originIndex?: number
      originParentId?: string
    }
  | {
      name: 'removeNodes'
      objs: NodeObj[]
    }

export type SummaryOperation =
  | {
      name: 'createSummary'
      obj: Summary
    }
  | {
      name: 'removeSummary'
      obj: { id: string }
    }
  | {
      name: 'finishEditSummary'
      obj: Summary
    }

export type CustomLinkOperation =
  | {
      name: 'createCustomLink'
      obj: LinkItem
    }
  | {
      name: 'removeCustomLink'
      obj: { id: string }
    }
  | {
      name: 'finishEditCustomLinkLabel'
      obj: LinkItem
    }

export type Operation = NodeOperation | SummaryOperation | CustomLinkOperation
export type OperationType = Operation['name']

export type EventMap = {
  operation: (info: Operation) => void
  selectNode: (nodeObj: NodeObj, e?: MouseEvent) => void
  selectNewNode: (nodeObj: NodeObj) => void
  selectNodes: (nodeObj: NodeObj[]) => void
  unselectNode: () => void
  unselectNodes: () => void
  expandNode: (nodeObj: NodeObj) => void
  iconDocClicked: (nodeObj: NodeObj, e?: MouseEvent) => void
  iconTaskClicked: (nodeObj: NodeObj, e?: MouseEvent) => void
  iconPlanningClicked: (nodeObj: NodeObj, e?: MouseEvent) => void
  iconFlagClicked: (nodeObj: NodeObj, e?: MouseEvent) => void
}

const Bus = {
  create<T extends Record<string, (...args: any[]) => void> = EventMap>() {
    return {
      handlers: {} as Record<keyof T, ((...arg: any[]) => void)[]>,
      showHandler: function () {
        console.log(this.handlers)
      },
      addListener: function <K extends keyof T>(type: K, handler: T[K]) {
        if (this.handlers[type] === undefined) this.handlers[type] = []
        this.handlers[type].push(handler)
      },
      fire: function <K extends keyof T>(type: K, ...payload: Parameters<T[K]>) {
        if (this.handlers[type] instanceof Array) {
          const handlers = this.handlers[type]
          for (let i = 0; i < handlers.length; i++) {
            handlers[i](...payload)
          }
        }
      },
      removeListener: function <K extends keyof T>(type: K, handler: T[K]) {
        if (!this.handlers[type]) return
        const handlers = this.handlers[type]
        if (!handler) {
          handlers.length = 0
        } else if (handlers.length) {
          for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
              this.handlers[type].splice(i, 1)
            }
          }
        }
      },
    }
  },
}

export default Bus
