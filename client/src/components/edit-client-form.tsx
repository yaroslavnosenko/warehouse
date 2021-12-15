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

import { Client } from '../types'

interface Props {
  client: Client | undefined
  onClose: () => void
  onSave: (client: Client) => void
}

const _empty: Client = { id: 0, full_name: '' }

export const EditClientForm = (props: Props) => {
  const { client, onClose, onSave } = props
  const [form, setForm] = useState<Client>(_empty)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setForm(props.client || _empty)
    setLoading(false)
  }, [props])

  return (
    <Modal isOpen={!!client} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Client</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Full name"
              value={form.full_name}
              onChange={(event) => setForm({ ...form, full_name: event.target.value })}
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
