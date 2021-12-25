import { Transaction } from '../types'
import { transactions } from '../mock'

export const getAllTransactions = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return transactions
}

export const createTransaction = async (transaction: Transaction): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ids: number[] = transactions.map((item) => item.id)
  transaction.id = Math.max(...ids) + 1
  transaction.timestamp = Date.now()
  transactions.push(transaction)
}

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = transactions.findIndex((_item) => _item.id === transaction.id)
  transactions[itemIdx] = transaction
}

export const deleteTransaction = async (transactionId: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = transactions.findIndex((_item) => _item.id === transactionId)
  transactions.splice(itemIdx, 1)
}
