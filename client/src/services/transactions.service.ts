import { Transaction } from '../types'

const SERVER: string = 'https://garden-warehouse-api.herokuapp.com'

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${SERVER}/transactions`)
  const data = await res.json()
  return data as Transaction[]
}

export const createTransaction = async (transaction: Transaction): Promise<void> => {
  const data: any = {
    client_id: transaction.client?.id || null,
    items: transaction.items.map((item) => ({ id: item.item.id, count: item.count })),
  }
  await fetch(`${SERVER}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// export const updateTransaction = async (transaction: Transaction): Promise<void> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   const itemIdx: number = transactions.findIndex((_item) => _item.id === transaction.id)
//   transactions[itemIdx] = transaction
// }

// export const deleteTransaction = async (transactionId: number): Promise<void> => {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   const itemIdx: number = transactions.findIndex((_item) => _item.id === transactionId)
//   transactions.splice(itemIdx, 1)
// }
