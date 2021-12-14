import { ChakraProvider, theme } from '@chakra-ui/react'
import { HomePage } from '../pages'

export const App = () => (
  <ChakraProvider theme={theme}>
    <HomePage />
  </ChakraProvider>
)
