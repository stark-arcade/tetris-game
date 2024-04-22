"use client";
import React, { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";
// Include Provider for Chakra UI

const ProviderApp = ({ children }: PropsWithChildren) => {
  return <ProviderStarknet>{children}</ProviderStarknet>;
};

export default ProviderApp;
