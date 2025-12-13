'use client';
import React from "react";
import PlayerForm, { type Player } from "../components/PlayerForm";
import PlayerCard from "../components/PlayerCard";
import SessionList from "../components/SessionList";

export default function Home() {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [availableForms, setAvailableForms] = React.useState(() => [0, 1]);

  function handleAdd(player: Omit<Player, "id">) {
    const newPlayer: Player = { id: String(Date.now()) + Math.random(), ...player };
    setPlayers((p) => [newPlayer, ...p]);
  }

  const activeSessions = [
    { id: "s1", title: "Sunday Cash Game", date: "Dec 11" },
    { id: "s2", title: "Quick Sit & Go", date: "Dec 8" },
  ];

  const completedSessions = [
    { id: "c1", title: "Friday Tournament", date: "Dec 1" },
    { id: "c2", title: "Monthly Meetup", date: "Nov 28" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold">Sessions & Players</h1>

        <div className="mx-auto flex w-full gap-6">
          {/* Left column */}
          <aside className="w-1/2">
            <div className="flex flex-col gap-4">
              <SessionList title="Active sessions" sessions={activeSessions} defaultOpen />
              <SessionList title="Completed sessions" sessions={completedSessions} defaultOpen={false} />
            </div>
          </aside>

          {/* Right column */}
          <section className="w-1/2">
            <div className="flex flex-col gap-4">
              <div className="rounded-md border border-zinc-200 p-4">
                <h2 className="mb-3 text-lg font-semibold">Add players</h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {availableForms.map((k) => (
                    <PlayerForm key={k} onAdd={handleAdd} />
                  ))}
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-100"
                    onClick={() => setAvailableForms((f) => [...f, f.length + 1])}
                  >
                    Add another form
                  </button>
                </div>
              </div>

              <div className="rounded-md border border-zinc-200 p-4">
                <h3 className="mb-3 text-lg font-semibold">Added players</h3>
                <div className="flex flex-col gap-2">
                  {players.length === 0 ? (
                    <div className="text-sm text-zinc-500">No players added yet</div>
                  ) : (
                    players.map((p) => (
                      <PlayerCard key={p.id} player={p} onRemove={(id) => setPlayers((ps) => ps.filter((pp) => pp.id !== id))} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
