import { useEffect, useState } from 'react'
import { Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon, Stack, StackDivider } from '@chakra-ui/react'
import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { deleteItem, getAllItems, updateItem } from '../services'
import { Item } from '../types'
import { EditItemForm } from '.'

const TableHead = () => {
  return (
    <Grid templateColumns="2fr 1fr 1fr 1fr 8rem" alignItems="center" color="gray.500">
      <Text fontWeight="500" mr="4" flex="1">
        Title
      </Text>
      <Text textAlign="center" fontWeight="500" mr="4" flex="1">
        Available
      </Text>
      <Text textAlign="center" fontWeight="500" mr="4" flex="1">
        Borrowed
      </Text>
      <Text textAlign="center" fontWeight="500" mr="4" flex="1">
        All
      </Text>
      <div />
    </Grid>
  )
}

const Loading = () => {
  return (
    <>
      <Skeleton mb="4" h="10" mt="2" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton mb="4" h="10" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton mb="4" h="10" startColor="gray.100" endColor="gray.200" borderRadius="md" />
      <Skeleton mb="4" h="10" startColor="gray.100" endColor="gray.200" borderRadius="md" />
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
    <Grid templateColumns="2fr 1fr 1fr 1fr 8rem" alignItems="center">
      <Text fontWeight="500" mr="4" flex="1">
        {item.title}
      </Text>
      <Text textAlign="center" mr="4" flex="1">
        {item.count_available || 0}
      </Text>
      <Text textAlign="center" mr="4" flex="1">
        {(item.count_all || 0) - (item.count_available || 0)}
      </Text>
      <Text textAlign="center" fontWeight="500" mr="4" flex="1">
        {item.count_all || 0}
      </Text>
      <HStack spacing="0" justifyContent="flex-end">
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} onClick={() => onClickDelete(item.id)} />
        <IconButton onClick={() => onClickEdit(item)} variant="ghost" aria-label="" icon={<BiDotsVerticalRounded />} />
      </HStack>
    </Grid>
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

  const onSave = async (item: Item) => {
    await updateItem(item)
    setEdit(undefined)
    updateList()
  }

  const onDelete = async (itemId: number) => {
    await deleteItem(itemId)
    updateList()
  }

  return (
    <>
      {items && items.length === 0 && <Empty />}
      <Stack divider={<StackDivider borderColor="gray.200" />}>
        <TableHead />
        {!items && <Loading />}
        {items &&
          items.length !== 0 &&
          items.map((item) => (
            <ItemItem onClickEdit={(item) => setEdit(item)} key={item.id} item={item} onClickDelete={onDelete} />
          ))}
      </Stack>
      <EditItemForm item={edit} onClose={() => setEdit(undefined)} onSave={onSave} />
    </>
  )
}
