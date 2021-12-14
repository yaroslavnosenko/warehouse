import { Box } from '@chakra-ui/layout'
import { PropsWithChildren } from 'react'

export const Container = (props: PropsWithChildren<any>) => {
  const { children } = props
  return <Box px="12">{children}</Box>
}
