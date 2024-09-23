type LangPack = {
  addChild: string
  addParent: string
  addSibling: string
  removeNode: string
  focus: string
  cancelFocus: string
  moveUp: string
  moveDown: string
  link: string
  clickTips: string
  summary: string
  font: string
  background: string
  tag: string
  icon: string
  tagsSeparate: string
  iconsSeparate: string
  url: string
  addChildShortcut: string
  addSiblingShortcut: string
  deleteShortcut: string
}
export type Locale = 'cn' | 'zh_CN' | 'zh_TW' | 'en' | 'ru' | 'ja' | 'pt' | 'it' | 'es'
const cn = {
  addChild: '插入子节点',
  addParent: '插入父节点',
  addSibling: '插入同级节点',
  removeNode: '删除节点',
  focus: '专注',
  cancelFocus: '取消专注',
  moveUp: '上移',
  moveDown: '下移',
  link: '连接',
  clickTips: '请点击目标节点',
  summary: '摘要',
}
const i18n: Record<Locale, LangPack> = {
  cn,
  zh_CN: cn,
  zh_TW: {
    addChild: '插入子節點',
    addParent: '插入父節點',
    addSibling: '插入同級節點',
    removeNode: '刪除節點',
    focus: '專注',
    cancelFocus: '取消專注',
    moveUp: '上移',
    moveDown: '下移',
    link: '連接',
    clickTips: '請點擊目標節點',
    summary: '摘要',
  },
  en: {
    addChild: 'Add child',
    addParent: 'Add parent',
    addSibling: 'Add sibling',
    removeNode: 'Remove node',
    focus: 'Focus Mode',
    cancelFocus: 'Cancel Focus Mode',
    moveUp: 'Move up',
    moveDown: 'Move down',
    link: 'Link',
    clickTips: 'Please click the target node',
    summary: 'Summary',
    font: 'Font',
    background: 'Background',
    tag: 'Tag',
    icon: 'Icon',
    tagsSeparate: 'Tags (comma separated)',
    iconsSeparate: 'Icons (comma separated)',
    url: 'URL',
    addChildShortcut: 'Tab',
    addSiblingShortcut: 'Return',
    deleteShortcut: 'Del',
  },
  de: {
    addChild: 'Knoten hinzufügen',
    addParent: 'Übergeordneten Knoten hinzufügen',
    addSibling: 'Knoten hinzufügen (als Nachbar)',
    removeNode: 'Knoten löschen',
    focus: 'Fokusmodus',
    cancelFocus: 'Fokusmodus beenden',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
    link: 'Link',
    clickTips: 'Bitte wählen Sie einen Zielknoten aus',
    summary: 'Zusammenfassung',
    font: 'Schrift',
    background: 'Hintergrund',
    tag: 'Tag',
    icon: 'Icon',
    tagsSeparate: 'Tags (durch Kommas getrennt)',
    iconsSeparate: 'Icons (durch Kommas getrennt)',
    url: 'URL',
    addChildShortcut: 'Tab',
    addSiblingShortcut: 'Enter',
    deleteShortcut: 'Entf',
  },
  it: {
    addChild: 'Aggiungi figlio',
    addParent: 'Aggiungi genitore',
    addSibling: 'Aggiungi fratello',
    removeNode: 'Rimuovi nodo',
    focus: 'Modalità Focus',
    cancelFocus: 'Annulla Modalità Focus',
    moveUp: 'Sposta su',
    moveDown: 'Sposta giù',
    link: 'Collega',
    clickTips: 'Si prega di fare clic sul nodo di destinazione',
    summary: 'Unisci nodi',
  },
  es: {
    addChild: 'Agregar hijo',
    addParent: 'Agregar padre',
    addSibling: 'Agregar hermano',
    removeNode: 'Eliminar nodo',
    focus: 'Modo Enfoque',
    cancelFocus: 'Cancelar Modo Enfoque',
    moveUp: 'Mover hacia arriba',
    moveDown: 'Mover hacia abajo',
    link: 'Enlace',
    clickTips: 'Por favor haga clic en el nodo de destino',
    summary: 'Resumen',
  },
}

export default i18n
