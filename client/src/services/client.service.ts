import { Client } from '../types'
import { clients } from '../mock'

export const getAllClients = async (): Promise<Client[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return clients
}

export const createClient = async (client: Client): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ids: number[] = clients.map((client) => client.id)
  client.id = Math.max(...ids) + 1
  clients.push(client)
}

export const updateClient = async (client: Client): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const clientIdx: number = clients.findIndex((item) => item.id === client.id)
  clients[clientIdx] = client
}
