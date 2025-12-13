"use client";
import React from "react";

export type Player = {
  id: string;
  name: string;
  buyIn: string;
  cashOut: string;
};

type PlayerFormProps = {
  onAdd: (player: Omit<Player, "id">) => void;
  defaultValues?: Partial<Player>;
};

export default function PlayerForm({ onAdd, defaultValues = {} }: PlayerFormProps) {
  const [name, setName] = React.useState(defaultValues.name ?? "");
  const [buyIn, setBuyIn] = React.useState(defaultValues.buyIn ?? "");
  const [cashOut, setCashOut] = React.useState(defaultValues.cashOut ?? "");

  function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name) return;
    onAdd({ name, buyIn, cashOut });
    setName("");
    setBuyIn("");
    setCashOut("");
  }

  return (
    <form onSubmit={handleAdd} className="flex w-full flex-col gap-3 rounded-md border border-zinc-200 p-4">
      <label className="flex w-full flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
          placeholder="Player name"
        />
      </label>

      <div className="flex gap-3">
        <label className="flex w-1/2 flex-col gap-1">
          <span className="text-sm font-medium">Buy-In</span>
          <input
            value={buyIn}
            onChange={(e) => setBuyIn(e.target.value)}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            placeholder="0.00"
            inputMode="numeric"
          />
        </label>
        <label className="flex w-1/2 flex-col gap-1">
          <span className="text-sm font-medium">Cash Out</span>
          <input
            value={cashOut}
            onChange={(e) => setCashOut(e.target.value)}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            placeholder="0.00"
            inputMode="numeric"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Add player
        </button>
      </div>
    </form>
  );
}
