import { Item } from '../types'

const SERVER: string = 'https://garden-warehouse-api.herokuapp.com'

export const getAllItems = async (): Promise<Item[]> => {
  const res = await fetch(`${SERVER}/items`)
  const data = await res.json()
  return data as Item[]
}

export const createItem = async (item: Item): Promise<void> => {
  const data: any = { title: item.title }
  await fetch(`${SERVER}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateItem = async (item: Item): Promise<void> => {
  const { id, title } = item
  const data: any = { title }
  await fetch(`${SERVER}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteItem = async (itemId: number): Promise<void> => {
  await fetch(`${SERVER}/items/${itemId}`, { method: 'DELETE' })
}
