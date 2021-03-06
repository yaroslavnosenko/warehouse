import { ChakraProvider, theme, Box } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage, ClientsPage, ItemsPage, TransactionsPage } from '../pages'
import { Navigation } from '.'

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Box ml="72">
        <Navigation />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
)
