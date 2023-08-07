import type { createParent, createWrapper } from '../utils/dom'
import type Bus from '../utils/pubsub'
import type { changeTheme } from '../utils/theme'
import type { Topic, CustomSvg } from './dom'
import type { EventMap, Operation } from '../utils/pubsub'
import type {
  Init,
  CreateChildren,
  CreateTopic,
  InsertNodeCommon,
  CreateInputDiv,
  MoveNodeToCommon,
  MoveNodeCommon,
  RemoveNode,
  TNodeCopy,
  SetNodeTopic,
  SelectNodeFunc,
  CommonSelectFunc,
  SiblingSelectFunc,
  GetDataStringFunc,
  GetDataFunc,
  ExpandNode,
  RefreshFunc,
  RemoveLink,
  SelectLink,
  HideLinkController,
  CreateLink,
  ShowLinkController,
} from './function'
import type { Scale, ToCenter, FocusNode, CancelFocus, InitLeft, InitRight, InitSide, SetLocale, EnableEdit, DisableEdit, Install } from './interact'
import type { reshapeNode } from '../nodeOperation'
import type linkDiv from '../linkDiv'
import type { layout } from '../utils/layout'

export interface Theme {
  name: string
  palette: string[]
  cssVar: Record<string, string>
  // {
  //   '--main-color': string
  //   '--main-bgcolor': string
  //   '--color': string
  //   '--bgcolor': string
  // }
}

export interface LinkDragMoveHelperInstance {
  dom: HTMLElement
  mousedown: boolean
  lastX: number
  lastY: number
  init: (map: HTMLElement, cb: (deltaX: number, deltaY: number) => void) => void
  destory: (map: HTMLElement) => void
  clear: () => void
  handleMouseMove: (e: MouseEvent) => void
  handleMouseDown: (e: MouseEvent) => void
  handleClear: (e: MouseEvent) => void

  cb: ((deltaX: number, deltaY: number) => void) | null
}

export interface MindElixirInstance {
  isFocusMode: boolean
  nodeDataBackup: NodeObj
  mindElixirBox: HTMLElement
  nodeData: NodeObj
  linkData: LinkObj
  currentNode: Topic | null
  waitCopy: Topic | null
  currentLink: CustomSvg | null
  inputDiv: HTMLElement | null
  scaleVal: number
  tempDirection: number | null

  bus: ReturnType<typeof Bus.create<EventMap>>

  history: Operation[]
  undo: () => void
  redo: () => void

  install: Install

  theme: Theme
  userTheme?: Theme
  direction: number
  locale: string
  draggable: boolean
  editable: boolean
  contextMenu: boolean
  contextMenuOption: object
  toolBar: boolean
  keypress: boolean
  before: Before
  newTopicName: string
  allowUndo: boolean
  overflowHidden: boolean
  mainLinkStyle: number
  subLinkStyle: number
  mobileMenu: boolean

  container: HTMLElement
  map: HTMLElement
  root: HTMLElement
  nodes: HTMLElement
  lines: SVGElement
  linkController: SVGElement
  P2: HTMLElement
  P3: HTMLElement
  line1: SVGElement
  line2: SVGElement
  linkSvgGroup: SVGElement

  mapHeight: number

  init: Init

  generateNewObj: GenerateNewObj
  createWrapper: typeof createWrapper
  createParent: typeof createParent
  createChildren: CreateChildren
  createTopic: CreateTopic

  linkDiv: typeof linkDiv

  addChild: InsertNodeCommon
  createInputDiv: CreateInputDiv

  moveNode: MoveNodeToCommon
  moveUpNode: MoveNodeCommon
  moveDownNode: MoveNodeCommon
  moveNodeBefore: MoveNodeToCommon
  moveNodeAfter: MoveNodeToCommon
  removeNode: RemoveNode
  copyNode: TNodeCopy
  setNodeTopic: SetNodeTopic

  insertParent: InsertNodeCommon
  insertSibling: InsertNodeCommon
  insertBefore: InsertNodeCommon

  selectNode: SelectNodeFunc
  unselectNode: CommonSelectFunc
  selectNextSibling: SiblingSelectFunc
  selectPrevSibling: SiblingSelectFunc
  selectFirstChild: CommonSelectFunc
  selectParent: CommonSelectFunc
  getDataString: GetDataStringFunc
  getData: GetDataFunc
  getDataMd: GetDataStringFunc
  scale: Scale
  toCenter: ToCenter
  focusNode: FocusNode
  cancelFocus: CancelFocus
  initLeft: InitLeft
  initRight: InitRight
  initSide: InitSide
  setLocale: SetLocale
  enableEdit: EnableEdit
  disableEdit: DisableEdit
  expandNode: ExpandNode
  refresh: RefreshFunc

  layout: typeof layout
  beginEdit: InsertNodeCommon
  fillParent: FillParent
  getObjById: GetObjById
  removeLink: RemoveLink
  selectLink: SelectLink
  hideLinkController: HideLinkController
  createLink: CreateLink
  showLinkController: ShowLinkController
  helper1: LinkDragMoveHelperInstance
  helper2: LinkDragMoveHelperInstance

  changeTheme: typeof changeTheme
  reshapeNode: typeof reshapeNode
}

export type Before = Record<string, (...args: any[]) => Promise<boolean> | boolean>
export type GenerateNewObj = (this: MindElixirInstance) => NodeObjExport
export type GetObjById = (id: string, data: NodeObj) => NodeObj | null
export type FillParent = (data: NodeObj, parent?: NodeObj) => void

export interface Options {
  el: string | HTMLElement
  direction?: number
  locale?: string
  draggable?: boolean
  editable?: boolean
  contextMenu?: boolean
  contextMenuOption?: any
  toolBar?: boolean
  keypress?: boolean
  before?: Before
  newTopicName?: string
  allowUndo?: boolean
  overflowHidden?: boolean
  mainLinkStyle?: number
  subLinkStyle?: number
  mobileMenu?: boolean
  theme?: Theme
  nodeMenu?: boolean
}
export type Uid = string

/**
 * MindElixir node object
 */
export interface NodeObj {
  topic: string
  id: Uid
  style?: {
    fontSize?: string
    color?: string
    background?: string
    fontWeight?: string
  }
  children?: NodeObj[]
  tags?: string[]
  icons?: string[]
  hyperLink?: string
  expanded?: boolean
  direction?: number
  root?: boolean
  image?: {
    url: string
    width: number
    height: number
  }
  // main node specific properties
  branchColor?: string
  // add programatically
  parent?: NodeObj // root node has no parent
}
export type NodeObjExport = Omit<NodeObj, 'parent'>
export type LinkItem = {
  id: string
  label: string
  from: Uid
  to: Uid
  delta1: {
    x: number
    y: number
  }
  delta2: {
    x: number
    y: number
  }
}
export type LinkObj = Record<string, LinkItem>

export interface MindElixirData {
  nodeData: NodeObj
  linkData?: LinkObj
  direction?: number
  theme?: Theme
}
