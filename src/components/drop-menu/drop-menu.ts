export type TDropMenuItem = {
  name: string
  text: string
  icon?: string
  title?: string
  hidden?: boolean
  type?: 'link' | 'checkbox'
  selected?: boolean
}

export type TDropMenu = {
  items: TDropMenuItem[]
  filter?: (sender:  unknown, index: number, count: number) => TDropMenuItem[]
}