import { Transaction } from '../types'
import { transactions } from '../mock'

export const getAllTransactions = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return transactions
}

export const createTransaction = async (transaction: Transaction): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // const ids: number[] = items.map((item) => item.id)
  // item.id = Math.max(...ids) + 1
  // items.push(item)
}

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // const itemIdx: number = items.findIndex((_item) => _item.id === item.id)
  // items[itemIdx] = item
}

export const deleteTransaction = async (transactionId: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // const itemIdx: number = items.findIndex((_item) => _item.id === itemId)
  // items.splice(itemIdx, 1)
}
