import { useEffect, useState } from 'react'
import { Grid, HStack, IconButton, Skeleton, Text, Alert, AlertIcon, Stack, StackDivider } from '@chakra-ui/react'
import { BiTrash, BiDotsVerticalRounded, BiInfoCircle } from 'react-icons/bi'

import { deleteTransaction, getAllTransactions, updateTransaction } from '../services'
import { Transaction, TR_IT } from '../types'
import { EditTransactionForm } from '.'

const TableHead = () => {
  return (
    <Grid templateColumns="1fr 1fr 2fr 8rem" alignItems="center" color="gray.500">
      <Text fontWeight="500" mr="4" flex="1">
        Datetime
      </Text>
      <Text fontWeight="500" mr="4" flex="1">
        Client
      </Text>
      <Text fontWeight="500" mr="4" flex="1">
        Items
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
  item: Transaction
  onClickEdit: (transaction: Transaction) => void
  onClickDelete: (transactionId: number) => void
}

interface Props {
  item: TR_IT
}

const ItemItem = (props: Props) => {
  const { count } = props.item
  const { title } = props.item.item
  return (
    <span>
      <Text as="span" fontWeight="500" mr="4" flex="1">
        {title}:{' '}
        <span style={{ color: count > 0 ? 'green' : 'red' }}>
          {count > 0 ? '+' : ''}
          {count}
        </span>
        ,
      </Text>
    </span>
  )
}

const TransactionItem = (props: ItemProps) => {
  const { onClickEdit, item, onClickDelete } = props
  return (
    <Grid templateColumns="1fr 1fr 2fr 8rem" alignItems="center">
      <Text mr="4" flex="1">
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text fontWeight="500" mr="4" flex="1">
        {item.client?.full_name || '-----'}
      </Text>
      <Text mr="4" flex="1">
        {item.items.map((item) => (
          <ItemItem item={item} key={item.item.id} />
        ))}
      </Text>
      <HStack spacing="0" justifyContent="flex-end">
        <IconButton variant="ghost" aria-label="" icon={<BiTrash />} onClick={() => onClickDelete(item.id)} />
        <IconButton onClick={() => onClickEdit(item)} variant="ghost" aria-label="" icon={<BiDotsVerticalRounded />} />
      </HStack>
    </Grid>
  )
}

export const TransactionList = () => {
  const [items, setItems] = useState<Transaction[] | undefined>()
  const [edit, setEdit] = useState<Transaction | undefined>(undefined)

  useEffect(() => {
    updateList()
  }, [])

  const updateList = () => {
    setItems(undefined)
    getAllTransactions().then((res) => setItems(res))
  }

  const onSave = async (item: Transaction) => {
    await updateTransaction(item)
    setEdit(undefined)
    updateList()
  }

  const onDelete = async (transactionId: number) => {
    await deleteTransaction(transactionId)
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
            <TransactionItem onClickEdit={(item) => setEdit(item)} key={item.id} item={item} onClickDelete={onDelete} />
          ))}
      </Stack>
      <EditTransactionForm transaction={edit} onClose={() => setEdit(undefined)} onSave={onSave} />
    </>
  )
}
