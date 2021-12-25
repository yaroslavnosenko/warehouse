import { Transaction } from '../types'
import { clients, items } from '.'

export const transactions: Transaction[] = [
  {
    id: 1,
    timestamp: 1640433002070,
    items: [
      { item: items[0], count: 26 },
      { item: items[1], count: 12 },
      { item: items[2], count: 30 },
    ],
  },
  {
    id: 2,
    timestamp: 1640433464098,
    client: clients[0],
    items: [
      { item: items[0], count: -12 },
      { item: items[1], count: -7 },
      { item: items[2], count: -8 },
    ],
  },
]
