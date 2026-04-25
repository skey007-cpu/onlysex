"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext<any>(null);

type Transaction = {
    id: number;
    type: "deposit" | "withdraw";
    amount: number;
    label: string;
    date: string;
};

export const WalletProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [balance, setBalance] = useState(6000);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [purchasedPosts, setPurchasedPosts] = useState<string[]>([]);

    // 🔄 LOAD LOCAL STORAGE
    useEffect(() => {
        const saved = localStorage.getItem("purchasedPosts");
        if (saved) {
            setPurchasedPosts(JSON.parse(saved));
        }
    }, []);

    // 💾 SAVE LOCAL STORAGE
    useEffect(() => {
        localStorage.setItem(
            "purchasedPosts",
            JSON.stringify(purchasedPosts)
        );
    }, [purchasedPosts]);

    // 💰 ACHAT
    const buyContent = (postId: string, price: number, label = "Achat contenu") => {
        // déjà acheté
        if (purchasedPosts.includes(postId)) {
            return;
        }

        // solde insuffisant
        if (balance < price) {
            alert("Solde insuffisant ❌");
            return;
        }

        // update balance
        setBalance((prev) => prev - price);

        // save achat
        setPurchasedPosts((prev) => [...prev, postId]);

        // add transaction
        const newTransaction = {
            id: Date.now(),
            type: "withdraw",
            amount: price,
            label,
            date: "Maintenant",
        };

        setTransactions((prev) => [
            {
                id: Date.now(),
                type: "withdraw",
                amount: price,
                label: "Achat contenu",
                date: "Maintenant",
            },
            ...prev,
        ]);
    };

    return (
        <WalletContext.Provider
            value={{
                balance,
                transactions,
                buyContent,
                purchasedPosts,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);