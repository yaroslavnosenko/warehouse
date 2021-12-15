import { Item } from '../types'
import { items } from '../mock'

export const getAllItems = async (): Promise<Item[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return items
}

export const createItem = async (item: Item): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ids: number[] = items.map((item) => item.id)
  item.id = Math.max(...ids) + 1
  items.push(item)
}

export const updateItem = async (item: Item): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = items.findIndex((_item) => _item.id === item.id)
  items[itemIdx] = item
}

export const deleteItem = async (itemId: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = items.findIndex((_item) => _item.id === itemId)
  items.splice(itemIdx, 1)
}
