"use client";

import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext<any>(null);

export const WalletProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [balance, setBalance] = useState(2542452);

    return (
        <WalletContext.Provider value={{ balance, setBalance }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);