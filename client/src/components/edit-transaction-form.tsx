import {
  Button,
  Text,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useEffect, useState, ChangeEvent } from 'react'

import { getAllClients, getAllItems } from '../services'

import { Client, Item, Transaction } from '../types'

interface Props {
  transaction: Transaction | undefined
  onClose: () => void
  onSave: (item: Transaction) => void
}

const _empty: Transaction = { id: 0, timestamp: 0, items: [], client: undefined }

export const EditTransactionForm = (props: Props) => {
  const { transaction, onClose, onSave } = props
  const [form, setForm] = useState<Transaction>(_empty)
  const [items, setItems] = useState<Item[]>()
  const [clients, setClients] = useState<Client[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const isReady: boolean = !!items && !!clients

  useEffect(() => {
    setForm(props.transaction || _empty)
    setLoading(false)
  }, [props])

  useEffect(() => {
    loadForm()
  }, [])

  const loadForm = () => {
    getAllClients().then((res) => setClients(res))
    getAllItems().then((res) => setItems(res))
  }

  const onClientChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId: number = parseInt(event.target.value)
    const newForm = { ...form }
    newForm.client = clients?.find((client) => client.id === selectedId)
    setForm(newForm)
  }

  const onItemChange = (count: number, basicItem: Item) => {
    const newForm = { ...form }
    const editedIndex: number = form.items.findIndex((item) => item.item === basicItem)
    if (editedIndex >= 0) {
      newForm.items[editedIndex].count = count
    } else {
      newForm.items.push({ item: basicItem, count })
    }
    console.log(newForm)
    setForm(newForm)
  }

  return !isReady ? null : (
    <Modal isOpen={!!transaction} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Client</FormLabel>
            <Select placeholder="-----" defaultValue={form.client?.id} onChange={onClientChange}>
              {clients?.map((client) => (
                <option value={client.id} key={client.id}>
                  {client.full_name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt="4">
            <FormLabel>Items</FormLabel>
            {items?.map((item) => (
              <HStack mt="4" key={item.id}>
                <Text flex={1}>{item.title}</Text>
                <NumberInput
                  size="sm"
                  defaultValue={form.items.find((itx) => itx.item.id === item.id)?.count || 0}
                  min={-(item?.available || 0)}
                  onChange={(_, num) => onItemChange(num, item)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            ))}
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
