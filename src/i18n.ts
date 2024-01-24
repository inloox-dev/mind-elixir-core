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
const i18n: Record<string, LangPack> = {
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
}

export default i18n
