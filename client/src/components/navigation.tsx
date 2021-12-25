import { Box, Text, Button, Stack } from '@chakra-ui/react'
import { BiPaintRoll, BiUser, BiDirections } from 'react-icons/bi'
import { Link } from 'react-router-dom'

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
      py="14"
      d="flex"
      flexDir="column"
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <Box textAlign="center">
        <Text h="8" fontWeight="900" fontSize="20px" lineHeight="32px">
          Warehouse
        </Text>
      </Box>
      <Stack justify="center" flex="1">
        <Link to="/items">
          <Button w="100%" leftIcon={<BiPaintRoll />} colorScheme="blue" variant="ghost">
            Items
          </Button>
        </Link>
        <Link to="/clients">
          <Button w="100%" leftIcon={<BiUser />} colorScheme="blue" variant="ghost">
            Clients
          </Button>
        </Link>
        <Link to="/transactions">
          <Button w="100%" leftIcon={<BiDirections />} colorScheme="blue" variant="ghost">
            Transactions
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}
