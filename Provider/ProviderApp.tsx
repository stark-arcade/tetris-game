"use client";
import React, { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";

import ProviderWalletContext from "./ProviderWalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/themes";
import ProviderScript from "./ProviderScript";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <ProviderWalletContext>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ProviderScript />
      </ProviderWalletContext>
    </ProviderStarknet>
  );
};

export default ProviderApp;
