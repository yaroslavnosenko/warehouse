import { Client, Item } from '.'

export class TR_IT {
  item: Item
  count: number
}

export class Transaction {
  id: number
  timestamp: number
  items: TR_IT[]
  client?: Client
}
