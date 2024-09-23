import type { SummarySvgGroup } from './summary'
import type { Expander, CustomSvg, Topic } from './types/dom'
import type { MindElixirInstance } from './types/index'
import { isTopic } from './utils'
import dragMoveHelper from './utils/dragMoveHelper'

export default function (mind: MindElixirInstance) {
  mind.map.addEventListener('click', e => {
    if (e.button !== 0) return
    if (mind.helper1?.moved) {
      mind.helper1.clear()
      return
    }
    if (mind.helper2?.moved) {
      mind.helper2.clear()
      return
    }
    if (dragMoveHelper.moved) {
      dragMoveHelper.clear()
      return
    }

    const target = e.target as any
    const isNodeAction = target?.parentElement?.classList?.contains('button-node-action') === true

    if (!isNodeAction) {
      // e.preventDefault() // can cause <a /> tags don't work
      if (target.tagName === 'ME-EPD') {
        unselectAll(mind)
        mind.expandNode((target as Expander).previousSibling)
      } else if (!mind.editable) {
        unselectAll(mind)
        return
      } else if (isTopic(target)) {
        if (e.ctrlKey) {
          //multi select requested
          let selection: Topic[] = []
          if (mind.currentNode) {
            selection.push(mind.currentNode)
          } else if (mind.currentNodes) {
            selection.push(...mind.currentNodes)
          }
          const alreadySelected = selection.findIndex(n => n.nodeObj.id === target.nodeObj.id) !== -1
          if (alreadySelected) {
            selection = selection.filter(n => n.nodeObj.id !== target.nodeObj.id)
          } else {
            selection.push(target as Topic)
          }
          unselectAll(mind)
          mind.selectNodes(selection)
        } else {
          unselectAll(mind)
          mind.selectNode(target, false, e)
        }
      } else if (target.tagName === 'text') {
        unselectAll(mind)
        if (target.dataset.type === 'custom-link') {
          mind.selectLink(target.parentElement as CustomSvg)
        } else {
          mind.selectSummary(target.parentElement as unknown as SummarySvgGroup)
        }
      } else if (target.className === 'circle') {
        unselectAll(mind)
        // skip circle
      } else {
        unselectAll(mind)
        // lite version doesn't have hideLinkController
        mind.hideLinkController && mind.hideLinkController()
      }
    } else {
      if (target.parentElement.classList.contains('button-add-sibling')) {
        mind.insertSibling()
      } else if (target.parentElement.classList.contains('button-add-child')) {
        mind.addChild()
      } else if (target.parentElement.classList.contains('button-delete-node')) {
        mind.removeNode()
      } else if (target.parentElement.classList.contains('doc-icon')) {
        mind.bus.fire('iconDocClicked', target.nodeObj, e)
      } else if (target.parentElement.classList.contains('task-icon')) {
        mind.bus.fire('iconTaskClicked', target.nodeObj, e)
      } else if (target.parentElement.classList.contains('planning-icon')) {
        mind.bus.fire('iconPlanningClicked', target.nodeObj, e)
      } else if (target.parentElement.classList.contains('flag-icon')) {
        mind.bus.fire('iconFlagClicked', target.nodeObj, e)
      }
    }
  })

  mind.map.addEventListener('dblclick', e => {
    e.preventDefault()
    if (!mind.editable) return
    const target = e.target as HTMLElement
    if (isTopic(target)) {
      mind.beginEdit(target)
    } else if (target.tagName === 'text') {
      if (target.dataset.type === 'custom-link') {
        mind.editCutsomLinkLabel(target.parentElement as unknown as CustomSvg)
      } else {
        mind.editSummary(target.parentElement as unknown as SummarySvgGroup)
      }
    }
  })

  /**
   * drag and move the map
   */
  mind.map.addEventListener('mousemove', e => {
    // click trigger mousemove in windows chrome
    if (e.ctrlKey === true) return
    if ((e.target as HTMLElement).contentEditable !== 'true') {
      dragMoveHelper.onMove(e, mind.container)
    }
  })
  mind.map.addEventListener('mousedown', e => {
    const mouseMoveButton = mind.mouseSelectionButton === 0 ? 2 : 0
    if (e.button !== mouseMoveButton) return
    if (e.ctrlKey === true) return
    if ((e.target as HTMLElement).contentEditable !== 'true') {
      dragMoveHelper.moved = false
      dragMoveHelper.mousedown = true
    }
  })
  mind.map.addEventListener('mouseleave', e => {
    const mouseMoveButton = mind.mouseSelectionButton === 0 ? 2 : 0
    if (e.ctrlKey === true) return
    if (e.button !== mouseMoveButton) return
    dragMoveHelper.clear()
  })
  mind.map.addEventListener('mouseup', e => {
    const mouseMoveButton = mind.mouseSelectionButton === 0 ? 2 : 0
    if (e.ctrlKey === true) return
    if (e.button !== mouseMoveButton) return
    dragMoveHelper.clear()
  })
  mind.map.addEventListener('contextmenu', e => {
    e.preventDefault()
  })
}

function unselectAll(mind: MindElixirInstance) {
  mind.unselectNode()
  mind.unselectNodes()
  mind.unselectSummary()
  mind.unselectLink()
}
