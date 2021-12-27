import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Container, ClientList, EditClientForm } from '../components'
import { createClient } from '../services'
import { Client } from '../types'

const _empty: Client = { id: 0, full_name: '' }

export const ClientsPage = () => {
  const [create, setCreate] = useState<Client | undefined>()

  const onClientSave = async (client: Client) => {
    await createClient(client)
    setCreate(undefined)
  }

  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Clients</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />} onClick={() => setCreate(_empty)}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          {create && <ClientList />}
          {!create && <ClientList />}
        </Box>
      </Container>
      <EditClientForm client={create} onClose={() => setCreate(undefined)} onSave={onClientSave} />
    </Box>
  )
}
