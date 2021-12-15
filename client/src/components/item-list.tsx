import { useEffect, useState } from 'react'
import { Box, Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { deleteItem, getAllItems, updateItem } from '../services'
import { Item } from '../types'
import { EditItemForm } from '.'

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
      Item list is empty
    </Alert>
  )
}

interface ItemProps {
  item: Item
  onClickEdit: (client: Item) => void
  onClickDelete: (itemId: number) => void
}

const ItemItem = (props: ItemProps) => {
  const { onClickEdit, item, onClickDelete } = props
  return (
    <Box p="4" py="2" border="1px" borderColor="gray.300" borderRadius="md">
      <HStack spacing="0">
        <Text fontWeight="500" mr="4" flex="1">
          {item.title}
        </Text>
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} onClick={() => onClickDelete(item.id)} />
        <IconButton onClick={() => onClickEdit(item)} variant="ghost" aria-label="" icon={<BiDotsVerticalRounded />} />
      </HStack>
    </Box>
  )
}

export const ItemList = () => {
  const [items, setItems] = useState<Item[] | undefined>()
  const [edit, setEdit] = useState<Item | undefined>(undefined)

  useEffect(() => {
    updateList()
  }, [])

  const updateList = () => {
    setItems(undefined)
    getAllItems().then((res) => setItems(res))
  }

  const onClientSave = async (item: Item) => {
    await updateItem(item)
    setEdit(undefined)
    updateList()
  }

  const onClientDelete = async (itemId: number) => {
    await deleteItem(itemId)
    updateList()
  }

  return (
    <>
      {items && items.length === 0 && <Empty />}
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {!items && <Loading />}
        {items &&
          items.length !== 0 &&
          items.map((item) => (
            <ItemItem onClickEdit={(item) => setEdit(item)} key={item.id} item={item} onClickDelete={onClientDelete} />
          ))}
      </Grid>
      <EditItemForm item={edit} onClose={() => setEdit(undefined)} onSave={onClientSave} />
    </>
  )
}
