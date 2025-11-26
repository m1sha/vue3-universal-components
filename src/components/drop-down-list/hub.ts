import { removeItem } from "../../utils/array"


type Item = {
  isOpen: boolean
  close: () => void
}

class Hub {
  items: Item[] = []

  add (item: Item) {
    this.items.push(item)
  }

  delete (item: Item) {
    removeItem(this.items, p => p === item)
  }

  close () {
    this.items.forEach(p=> {
      if (p.isOpen) p.close()
    })
  }
}

export default new Hub()