import { useEffect, useState } from 'react'
import { Box, Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { deleteClient, getAllClients, updateClient } from '../services'
import { Client } from '../types'
import { EditClientForm } from '.'

const Loading = () => {
  return (
    <>
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton h="14" startColor="gray.100" endColor="gray.200" borderRadius="md" />
    </>
  )
}

const Empty = () => {
  return (
    <Alert status="warning" borderRadius="md">
      <AlertIcon as={BiInfoCircle} />
      Client list is empty
    </Alert>
  )
}

interface ItemProps {
  client: Client
  onClickEdit: (client: Client) => void
  onClickDelete: (clientId: number) => void
}

const ClientItem = (props: ItemProps) => {
  const { onClickEdit, client, onClickDelete } = props
  return (
    <Box p="4" py="2" border="1px" borderColor="gray.300" borderRadius="md">
      <HStack spacing="0">
        <Text fontWeight="500" mr="4" flex="1">
          {client.full_name}
        </Text>
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} onClick={() => onClickDelete(client.id)} />
        <IconButton
          onClick={() => onClickEdit(client)}
          variant="ghost"
          aria-label=""
          icon={<BiDotsVerticalRounded />}
        />
      </HStack>
    </Box>
  )
}

export const ClientList = () => {
  const [clients, setClients] = useState<Client[] | undefined>()
  const [edit, setEdit] = useState<Client | undefined>(undefined)

  useEffect(() => {
    updateList()
  }, [])

  const updateList = () => {
    setClients(undefined)
    getAllClients().then((res) => setClients(res))
  }

  const onClientSave = async (client: Client) => {
    await updateClient(client)
    setEdit(undefined)
    updateList()
  }

  const onClientDelete = async (clientId: number) => {
    await deleteClient(clientId)
    updateList()
  }

  return (
    <>
      {clients && clients.length === 0 && <Empty />}
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {!clients && <Loading />}
        {clients &&
          clients.length !== 0 &&
          clients.map((client) => (
            <ClientItem
              onClickEdit={(client) => setEdit(client)}
              key={client.id}
              client={client}
              onClickDelete={onClientDelete}
            />
          ))}
      </Grid>
      <EditClientForm client={edit} onClose={() => setEdit(undefined)} onSave={onClientSave} />
    </>
  )
}
