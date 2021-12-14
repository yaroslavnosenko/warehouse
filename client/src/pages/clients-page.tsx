import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

import { Container, ClientList } from '../components'

export const ClientsPage = () => {
  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Clients</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          <ClientList />
        </Box>
      </Container>
    </Box>
  )
}
