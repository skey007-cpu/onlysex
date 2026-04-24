"use client";

import React from "react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Wallet,
} from "lucide-react";
import { useWallet } from "@/components/WalletContext";

const WalletPage = () => {
    const { balance, transactions } = useWallet();

    // const transactions = [
    //     { id: 1, type: "deposit", amount: 5000, label: "Recharge wallet", date: "Aujourd'hui" },
    //     { id: 2, type: "withdraw", amount: 2000, label: "Achat service", date: "Hier" },
    //     { id: 3, type: "deposit", amount: 10000, label: "Bonus", date: "2 jours" },
    // ];

    return (
        <div className="min-h-screen dark:bg-zinc-950 text-gray-900 dark:text-white">

            <div className="max-w-5xl mx-auto px-4 py-6">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Mon Wallet
                    </h1>
                    <Wallet className="opacity-60" />
                </div>

                {/* BALANCE CARD */}
                <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-gray-500 rounded-2xl p-6 shadow-lg">

                    <p className="text-sm opacity-80">
                        Solde disponible
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-1">
                        {balance.toLocaleString("en-US")} Pecos
                    </h2>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 mt-6">

                        <button className="flex-1 bg-greens-95 text-white py-2 rounded-xl font-semibold active:scale-95 transition">
                            Dépôt
                        </button>

                        <button className="flex-1 bg-black/30 text-white py-2 rounded-xl font-semibold active:scale-95 transition">
                            Retrait
                        </button>

                    </div>
                </div>

                {/* INFO (desktop only) */}
                <div className="hidden md:block mt-6 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm">
                    <h3 className="font-semibold mb-2">Résumé</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ton wallet est sécurisé et synchronisé en temps réel.
                    </p>

                    <div className="mt-3 text-sm space-y-1 text-gray-600 dark:text-gray-300">
                        <p>✔ Transactions instantanées</p>
                        <p>✔ Paiements sécurisés</p>
                        <p>✔ Historique complet</p>
                    </div>
                </div>

                {/* TRANSACTIONS */}
                <div className="mt-8">

                    <h3 className="font-semibold mb-3 text-lg">
                        Historique
                    </h3>

                    <div className="space-y-3">

                        {transactions.map((t: { id: React.Key | null | undefined; type: string; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; amount: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => (
                            <div
                                key={t.id}
                                className="flex items-center justify-between bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-sm hover:shadow-md transition"
                            >

                                {/* LEFT */}
                                <div className="flex items-center gap-3">

                                    <div
                                        className={`p-2 rounded-full ${t.type === "deposit"
                                            ? "bg-green-100 text-green-600 dark:bg-green-500/20"
                                            : "bg-red-100 text-red-600 dark:bg-red-500/20"
                                            }`}
                                    >
                                        {t.type === "deposit" ? (
                                            <ArrowDownLeft size={18} />
                                        ) : (
                                            <ArrowUpRight size={18} />
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            {t.label}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {t.date}
                                        </p>
                                    </div>

                                </div>

                                {/* RIGHT */}
                                <p
                                    className={`font-semibold text-sm md:text-base ${t.type === "deposit"
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {t.type === "deposit" ? "+" : "-"}
                                    {t.amount.toLocaleString()} pecs
                                </p>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default WalletPage;