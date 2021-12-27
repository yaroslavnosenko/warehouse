import { Client } from '../types'

const SERVER: string = 'https://garden-warehouse-api.herokuapp.com'

export const getAllClients = async (): Promise<Client[]> => {
  const res = await fetch(`${SERVER}/clients`)
  const data = await res.json()
  return data as Client[]
}

export const createClient = async (client: Client): Promise<void> => {
  const data: any = { full_name: client.full_name }
  await fetch(`${SERVER}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateClient = async (client: Client): Promise<void> => {
  const { id, full_name } = client
  const data: any = { full_name }
  await fetch(`${SERVER}/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteClient = async (clientId: number): Promise<void> => {
  await fetch(`${SERVER}/clients/${clientId}`, { method: 'DELETE' })
}
