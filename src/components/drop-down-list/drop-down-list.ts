import hub from "./hub"
import { type DroplistOption } from "./option"
import { computed } from "vue"

export class DropDownList {
  private closeDelegate?: () => void
  isOpen: boolean = false

  onOpen: (() => void) | null = null
  
  constructor (private source: { items: DroplistOption[] }, private model: { value: any }) {}

  selected = computed( ()=> {
    return this.source.items.find(p=> p.id === this.model.value)
  })

  select (id: string) {
    this.model = id as any
  }
  
  open () {
    hub.close()
    this.isOpen = true
  }

  close () {
    
    this.isOpen = false
  }

  tigger () {
    if (this.isOpen) this.close()
    else
    this.open()
    this.onOpen?.()
  }

  init () {
    this.closeDelegate = () => { this.close() }
    document.addEventListener('click', this.closeDelegate)
    hub.add(this)
  }

  dispose () {
    document.removeEventListener('click', this.closeDelegate!)
    hub.delete(this)
  }
}