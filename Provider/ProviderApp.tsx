"use client";
import React, { PropsWithChildren } from "react";
import ProviderStarknet from "./ProviderStarknet";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

const ProviderApp = ({ children }: PropsWithChildren) => {
  return (
    <ProviderStarknet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ProviderStarknet>
  );
};

export default ProviderApp;
