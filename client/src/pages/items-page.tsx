import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Container, EditItemForm, ItemList } from '../components'
import { createItem } from '../services'
import { Item } from '../types'

const _empty: Item = { id: 0, title: '' }

export const ItemsPage = () => {
  const [create, setCreate] = useState<Item | undefined>()

  const onItemSave = async (item: Item) => {
    await createItem(item)
    setCreate(undefined)
  }

  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Items</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />} onClick={() => setCreate(_empty)}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          <ItemList />
        </Box>
      </Container>
      <EditItemForm item={create} onClose={() => setCreate(undefined)} onSave={onItemSave} />
    </Box>
  )
}
