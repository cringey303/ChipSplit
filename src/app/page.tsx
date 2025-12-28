'use client';
import React, { useState } from "react";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import PlayerCard, { type Player } from "../components/PlayerCard";
import SessionList from "../components/SessionList";
import { CoffeeButton } from "@/components/ui/coffee-button";
import { ObfuscatedMail } from "../components/obfuscated-mail";
import { calculateSettlement, Payment } from "@/lib/settlement";
import SettlementList from "@/components/settlement-list";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: String(Date.now()) + Math.random(),
      name: "",
      buyIn: 0,
      cashOut: 0,
      profit: 0,
    },
  ]);
  const [isSettled, setIsSettled] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  function handleAdd() {
    const newPlayer: Player = {
      id: String(Date.now()) + Math.random(),
      name: "",
      buyIn: 0,
      cashOut: 0,
      profit: 0,
    };
    /* Add new player to the end of the list, defaultEditing will be true */
    setPlayers((p) => [...p, newPlayer]);
  }

  function handleUpdate(updatedPlayer: Player) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
    );
  }

  function handleRemove(id: string) {
    setPlayers((currentPlayers) => currentPlayers.filter((p) => p.id !== id));
  }

  function handleClear() {
    if (players.length == 0) return;

    setPlayers([
      {
        id: String(Date.now()),
        name: "",
        buyIn: 0,
        cashOut: 0,
        profit: 0,
      },
    ]);
    // reset view if we were settled
    setIsSettled(false);
  }

  function handleCalculate() {
    const results = calculateSettlement(players);
    setPayments(results);
    setIsSettled(true);
  }

  function handleFixDiscrepancy() {
    // Strategy: Adjust Buy-In to match Cash-Out
    // If we have less cash out than buy in (negative discrepancy), effectively we bought in for less.
    // If we have more cash out (positive), we bought in for more.
    const totalBuyIn = players.reduce((acc, p) => acc + Number(p.buyIn), 0);
    const totalCashOut = players.reduce((acc, p) => acc + Number(p.cashOut), 0);
    const discrepancy = totalCashOut - totalBuyIn;

    if (Math.abs(discrepancy) < 0.01) return;

    const adjustmentPerPlayer = discrepancy / players.length;

    const adjustedPlayers = players.map((p) => {
      const newBuyIn = Number(p.buyIn) + adjustmentPerPlayer;
      // Round to 2 decimal places to avoid overly precise floating points
      const roundedBuyIn = Math.round(newBuyIn * 100) / 100;
      return {
        ...p,
        buyIn: roundedBuyIn,
        profit: Number(p.cashOut) - roundedBuyIn,
      };
    });

    setPlayers(adjustedPlayers);
    setPayments(calculateSettlement(adjustedPlayers));
  }

  const activeSessions = [
    { id: "s1", title: "street poker", date: "Dec 11" },
    { id: "s2", title: "bday", date: "Dec 8" },
  ];

  const completedSessions = [
    { id: "c1", title: "gang", date: "Dec 1" },
    { id: "c2", title: "nest", date: "Nov 28" },
  ];

  // Calculate totals for rendering
  const totalBuyIn = players.reduce((acc, p) => acc + Number(p.buyIn), 0);
  const totalCashOut = players.reduce((acc, p) => acc + Number(p.cashOut), 0);
  const discrepancy = totalCashOut - totalBuyIn;
  const hasDiscrepancy = Math.abs(discrepancy) > 0.01;

  return (
    <div className="flex min-h-screen flex-col px-4 pt-4 font-sans md:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <nav className="flex items-center justify-between py-4 mb-8 md:mb-16">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-brand">
              <Logo className="h-8 w-8 text-brand fill-brand" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#766D61]">ChipSplit</span>
          </a>
          <div className="flex items-center gap-2">
            <CoffeeButton />
          </div>
        </nav>

        <div className="mx-auto flex w-full flex-col-reverse gap-8 md:flex-row md:gap-6 justify-center">
          {/* Left column - SESSIONS HIDDEN AS REQUESTED */}
          {/* 
          <aside className="w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <SessionList title="Active sessions" sessions={activeSessions} defaultOpen />
              <SessionList title="Completed sessions" sessions={completedSessions} defaultOpen={false} />
            </div>
          </aside> 
          */}

          {/* Right column - Centered if alone */}
          <section className="w-full max-w-[1400px]">
            <div className="rounded-md border border-outline p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{isSettled ? "Settlements" : "Players"}</h2>
                <div className="flex gap-2">
                  {/* Only show clear/calc if not settled yet */}
                  {!isSettled ? (
                    <>
                      <button
                        onClick={handleClear}
                        className="cursor-pointer rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/40"
                      >
                        Clear
                      </button>
                      <button
                        onClick={handleCalculate}
                        className="cursor-pointer rounded-md bg-[#E5D5BC] px-4 py-2 text-sm font-medium text-[#FDEBD0] hover:opacity-90 dark:bg-[#766D61]"
                      >
                        Calculate
                      </button>
                    </>
                  ) : (
                    // changes to an 'Edit' button that goes back
                    <button
                      onClick={() => setIsSettled(false)}
                      className="cursor-pointer rounded-md border border-outline px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {!isSettled ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3">
                  {players.length === 0 && (
                    <div className="mb-2 text-sm text-zinc-500 col-span-full">No players added yet.</div>
                  )}

                  {players.map((p, i) => (
                    <PlayerCard
                      key={p.id}
                      player={p}
                      onRemove={handleRemove}
                      onUpdate={handleUpdate}
                      playerNumber={i + 1}
                      existingNames={players
                        .filter((other) => other.id !== p.id && other.name !== "") // Exclude self and empty names
                        .map((other) => other.name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Discrepancy Warning Banner - Only shown in Settlement View */}
                  {hasDiscrepancy && (
                    <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-900/50 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span>
                          <strong>Mismatch:</strong> Discrepancy of <span className="font-mono">{discrepancy > 0 ? "+" : ""}{discrepancy.toFixed(2)}</span>
                        </span>
                        <button
                          onClick={handleFixDiscrepancy}
                          className="cursor-pointer rounded-md bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700"
                        >
                          Auto-Fix
                        </button>
                      </div>
                      <p className="text-xs opacity-90">
                        The total Buy-In (${totalBuyIn.toFixed(2)}) doesn't match Cash-Out (${totalCashOut.toFixed(2)}). Settlements below may be inaccurate.
                      </p>
                    </div>
                  )}
                  <SettlementList payments={payments} />
                </div>
              )}

              {/* Hide 'Add Player' button when viewing settlements */}
              {!isSettled && (
                <div className="mt-4">
                  <button
                    onClick={handleAdd}
                    className="w-full cursor-pointer rounded-md border border-dashed border-brand py-3 text-sm font-medium text-brand hover:border-brand hover:bg-brand/10 dark:border-brand/50 dark:text-brand dark:hover:bg-brand/10"
                  >
                    + Add Player
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
        <footer className="w-full mt-auto pb-6 pt-8">
          <div className="w-full px-4">
            <div className="flex items-center justify-between border-t pt-4 text-sm text-brand">
              <div className="flex-1 flex justify-center gap-2 md:gap-4 pl-[88px] md:pl-[100px]">
                <span>© 2025</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Built by Lucas Root</span>
                <span className="sm:hidden">Lucas Root</span>
              </div>
              <ObfuscatedMail />
            </div>
          </div>
        </footer>
      </main>
    </div>

  );
}
