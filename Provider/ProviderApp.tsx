"use client";
import React, { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";

import ProviderWalletContext from "./ProviderWalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/themes";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <ProviderWalletContext>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </ProviderWalletContext>
    </ProviderStarknet>
  );
};

export default ProviderApp;
