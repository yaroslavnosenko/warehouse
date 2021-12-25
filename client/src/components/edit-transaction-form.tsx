import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Transaction } from '../types'

interface Props {
  transaction: Transaction | undefined
  onClose: () => void
  onSave: (item: Transaction) => void
}

const _empty: Transaction = { id: 0, timestamp: 0, items: [] }

export const EditTransactionForm = (props: Props) => {
  const { transaction, onClose, onSave } = props
  const [form, setForm] = useState<Transaction>(_empty)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setForm(props.transaction || _empty)
    setLoading(false)
  }, [props])

  return (
    <Modal isOpen={!!transaction} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Timestamp</FormLabel>
            <Input
              placeholder="Timestamp"
              value={form.timestamp}
              onChange={(event) => setForm({ ...form, timestamp: event.target.value as unknown as number })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setLoading(true)
              onSave(form)
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
