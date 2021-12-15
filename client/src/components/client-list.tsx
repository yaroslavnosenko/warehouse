import { useEffect, useState } from 'react'
import { Box, Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { getAllClients } from '../services'
import { Client } from '../types'

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
}

const ClientItem = (props: ItemProps) => {
  const { full_name } = props.client
  return (
    <Box p="4" py="2" border="1px" borderColor="gray.300" borderRadius="md">
      <HStack spacing="0">
        <Text fontWeight="500" mr="4" flex="1">
          {full_name}
        </Text>
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} />
        <IconButton variant="ghost" aria-label="" icon={<BiDotsVerticalRounded />} />
      </HStack>
    </Box>
  )
}

export const ClientList = () => {
  const [clients, setClients] = useState<Client[] | undefined>()

  useEffect(() => {
    getAllClients().then((res) => setClients(res))
  }, [])

  return (
    <>
      {clients && clients.length === 0 && <Empty />}
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {!clients && <Loading />}
        {clients && clients.length !== 0 && clients.map((client) => <ClientItem key={client.id} client={client} />)}
      </Grid>
    </>
  )
}
