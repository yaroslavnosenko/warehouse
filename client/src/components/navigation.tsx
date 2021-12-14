import { Box, Text, Button, Stack } from '@chakra-ui/react'
import { BiPaintRoll, BiUser, BiDirections, BiHomeAlt } from 'react-icons/bi'

export const Navigation = () => {
  return (
    <Box
      w="72"
      h="100vh"
      bg="white"
      position="fixed"
      left="0"
      top="0"
      p="8"
      d="flex"
      flexDir="column"
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Box textAlign="center">
        <Text h="8" fontWeight="900" fontSize="20px">
          Warehouse
        </Text>
      </Box>
      <Stack justify="center" flex="1">
        <Button w="100%" leftIcon={<BiHomeAlt />} colorScheme="blue" variant="ghost">
          Home
        </Button>
        <Button w="100%" leftIcon={<BiPaintRoll />} colorScheme="blue" variant="ghost">
          Items
        </Button>
        <Button w="100%" leftIcon={<BiUser />} colorScheme="blue" variant="ghost">
          Clients
        </Button>
        <Button w="100%" leftIcon={<BiDirections />} colorScheme="blue" variant="ghost">
          Transactions
        </Button>
      </Stack>
    </Box>
  )
}
