// 'use client'

// import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
// import { ColorModeProvider } from './color-mode'

// export function Provider(props) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   )
// }
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

// Define a custom theme if needed
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
});

export function Provider({ children, ...props }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider {...props}>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
