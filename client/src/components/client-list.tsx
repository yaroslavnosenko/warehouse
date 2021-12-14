import { Box, Grid, Heading, HStack, IconButton, Skeleton, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

const mockClients = [
  {
    id: 1,
    full_name: 'John Doe',
  },
  {
    id: 2,
    full_name: 'John Doe',
  },
  {
    id: 3,
    full_name: 'John Doe',
  },
  {
    id: 4,
    full_name: 'John Doe',
  },
  {
    id: 5,
    full_name: 'John Doe',
  },
  {
    id: 6,
    full_name: 'John Doe',
  },
  {
    id: 7,
    full_name: 'John Doe',
  },
]

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
  id: number
  full_name: string
}

const ClientItem = (props: ItemProps) => {
  const { id, full_name } = props
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
  const [clients, setClients] = useState<any[] | undefined>()

  useEffect(() => {
    setTimeout(() => {
      setClients([])
    }, 1000)
  }, [])

  return (
    <>
      {clients && clients.length === 0 && <Empty />}
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {!clients && <Loading />}
        {clients &&
          clients.length !== 0 &&
          clients.map((client) => <ClientItem key={client.id} id={client.id} full_name={client.full_name} />)}
      </Grid>
    </>
  )
}
