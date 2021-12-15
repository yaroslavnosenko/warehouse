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

import { Item } from '../types'

interface Props {
  item: Item | undefined
  onClose: () => void
  onSave: (item: Item) => void
}

const _empty: Item = { id: 0, title: '' }

export const EditItemForm = (props: Props) => {
  const { item, onClose, onSave } = props
  const [form, setForm] = useState<Item>(_empty)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setForm(props.item || _empty)
    setLoading(false)
  }, [props])

  return (
    <Modal isOpen={!!item} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Full name"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
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
