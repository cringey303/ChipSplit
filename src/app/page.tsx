'use client';
import React, { useState } from "react";
import Image from "next/image";
import PlayerCard, { type Player } from "../components/PlayerCard";
import SessionList from "../components/SessionList";
import { CoffeeButton } from "@/components/ui/coffee-button";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "1",
      name: "",
      buyIn: "",
      cashOut: "",
    },
  ]);

  function handleAdd() {
    const newPlayer: Player = {
      id: String(Date.now()) + Math.random(),
      name: "",
      buyIn: "",
      cashOut: "",
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

    setPlayers([
      {
        id: String(Date.now()),
        name: "",
        buyIn: "",
        cashOut: "",
      },
    ]);
  }

  const activeSessions = [
    { id: "s1", title: "street poker", date: "Dec 11" },
    { id: "s2", title: "bday", date: "Dec 8" },
  ];

  const completedSessions = [
    { id: "c1", title: "gang", date: "Dec 1" },
    { id: "c2", title: "nest", date: "Nov 28" },
  ];

  return (
    <div className="flex min-h-screen flex-col px-4 pt-4 font-sans md:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <nav className="flex items-center justify-between py-4 mb-8 md:mb-16">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="ChipSplit Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight">ChipSplit</span>
          </a>
          <div className="flex items-center gap-2">
            <CoffeeButton />
          </div>
        </nav>

        <div className="mx-auto flex w-full flex-col-reverse gap-8 md:flex-row md:gap-6">
          {/* Left column */}
          <aside className="w-full md:w-1/2">
            <div className="flex flex-col gap-4">
              <SessionList title="Active sessions" sessions={activeSessions} defaultOpen />
              <SessionList title="Completed sessions" sessions={completedSessions} defaultOpen={false} />
            </div>
          </aside>

          {/* Right column */}
          <section className="w-full md:w-1/2">
            <div className="rounded-md border border-outline p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Players</h2>
                <button
                  onClick={handleClear}
                  className="cursor-pointer rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                  Clear
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {players.length === 0 && (
                  <div className="mb-2 text-sm text-zinc-500">No players added yet.</div>
                )}

                {players.map((p, i) => (
                  <PlayerCard
                    key={p.id}
                    player={p}
                    onRemove={handleRemove}
                    onUpdate={handleUpdate}
                    defaultEditing={p.name === ""} // Simple heuristic: if empty name, assume new/editing
                    playerNumber={i + 1}
                  />
                ))}
              </div>

              <div className="mt-4">
                <button
                  onClick={handleAdd}
                  className="w-full cursor-pointer rounded-md border border-dashed border-zinc-300 py-3 text-sm font-medium text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
                >
                  + Add Player
                </button>
              </div>
            </div>
          </section>
        </div>
        <footer className="w-full mt-auto pb-6">
          <div className="w-full px-4">
            <div className="flex items-center justify-between border-t pt-4 text-sm text-zinc-500">
              <div className="flex-1 flex justify-center gap-2 md:gap-4 pl-[88px] md:pl-[100px]">
                <span>© 2025</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Built by Lucas Root</span>
                <span className="sm:hidden">Lucas Root</span>
              </div>
              <a
                href="mailto:mrlucasroot@gmail.com"
                className="hover:text-foreground transition-colors hover:underline whitespace-nowrap"
              >
                Report a Bug
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>

  );
}
