import { Box, Heading, HStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { Container, TransactionList, EditTransactionForm } from '../components'
import { createTransaction } from '../services'
import { Transaction } from '../types'

const _empty: Transaction = { id: 0, timestamp: 0, items: [], client: undefined }

export const TransactionsPage = () => {
  const [create, setCreate] = useState<Transaction | undefined>()

  const onTransactionSave = async (transaction: Transaction) => {
    await createTransaction(transaction)
    setCreate(undefined)
  }

  return (
    <Box my="12">
      <Container>
        <HStack>
          <Heading>Transactions</Heading>
          <Button colorScheme="blue" size="sm" variant="ghost" leftIcon={<BiPlus />} onClick={() => setCreate(_empty)}>
            Add new
          </Button>
        </HStack>

        <Box mt="12">
          {create && <TransactionList />}
          {!create && <TransactionList />}
        </Box>
      </Container>
      <EditTransactionForm transaction={create} onClose={() => setCreate(undefined)} onSave={onTransactionSave} />
    </Box>
  )
}
