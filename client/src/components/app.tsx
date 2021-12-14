import { ChakraProvider, theme, Box } from '@chakra-ui/react'
import { HomePage } from '../pages'
import { Navigation } from '.'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box ml="72">
      <Navigation />
      <HomePage />
    </Box>
  </ChakraProvider>
)
