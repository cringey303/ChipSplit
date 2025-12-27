"use client";
import React, { useState } from "react";

export type Player = {
  id: string;
  name: string;
  buyIn: number;
  cashOut: number;
  profit: number;
};

type PlayerCardProps = {
  player: Player;
  onRemove: (id: string) => void;
  onUpdate: (player: Player) => void;

  playerNumber?: number;
  existingNames?: string[];
};

export default function PlayerCard({
  player,
  onRemove,
  onUpdate,
  playerNumber,
  existingNames = [],
}: PlayerCardProps) {
  // Internal form state uses strings for buyIn/cashOut to match input field values
  const [formState, setFormState] = useState({
    name: player.name,
    buyIn: String(player.buyIn === 0 && player.name === "" ? "" : player.buyIn), // Show empty for new players if 0
    cashOut: String(player.cashOut === 0 && player.name === "" ? "" : player.cashOut),
  });
  const [showError, setShowError] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  // Sync internal state if parent updates (e.g. initial load or external change)
  // We strictly sync if the ID changes or if we want to force consistency. 
  // For now, simpler is better: we assume this component 'owns' the draft state until blur.

  const profit = Number(formState.cashOut) - Number(formState.buyIn);
  const isProfitPositive = profit > 0;

  const handleBlur = () => {
    // If user leaves field empty, treat as 0
    const b = formState.buyIn === "" ? 0 : Number(formState.buyIn);
    const c = formState.cashOut === "" ? 0 : Number(formState.cashOut);

    // Validate Name Duplication
    if (formState.name && formState.name !== player.name && existingNames.includes(formState.name)) {
      setNameError("Name taken");
      return; // Do not save
    }

    if (isNaN(b) || isNaN(c)) {
      setShowError(true);
      return;
    }

    // Only update if changed prevents infinite loops or unnecessary renders
    if (b !== player.buyIn || c !== player.cashOut || formState.name !== player.name) {
      const finalPlayer: Player = {
        ...player,
        name: formState.name,
        buyIn: b,
        cashOut: c,
        profit: c - b,
      };
      onUpdate(finalPlayer);
    }
    setShowError(false);
    setNameError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-outline bg-black p-4 dark:bg-black md:bg-white">
      <div className="flex w-full flex-col gap-1">
        <div className="relative">
          <input
            value={formState.name}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
              if (nameError) setNameError(null);
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowError(false)}
            className={`peer w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder-shown:border-outline focus:border-brand focus:ring-1 focus:ring-brand ${nameError ? "border-red-500 ring-1 ring-red-500" : "border-outline"}`}
            placeholder=" "
          />
          <label className="pointer-events-none absolute -top-2 left-2 z-10 bg-black px-1 text-xs font-medium text-brand transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-brand peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand dark:bg-black md:bg-white">
            Name
          </label>
        </div>
        {nameError && <span className="mt-1 text-xs text-red-500">{nameError}</span>}
      </div>

      <div className="flex gap-3 pt-2">
        <div className="relative w-1/2">
          <input
            value={formState.buyIn}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(val)) {
                setFormState({ ...formState, buyIn: val });
              }
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowError(false)}
            className={`peer w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder-shown:border-outline focus:border-brand focus:ring-1 focus:ring-brand ${showError ? "border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500" : "border-outline"
              }`}
            placeholder=" "
            inputMode="decimal"
          />
          <label className="pointer-events-none absolute -top-2 left-2 z-10 bg-black px-1 text-xs font-medium text-brand transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-brand peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand dark:bg-black md:bg-white">
            Buy-In {showError && <span className="text-red-500">*</span>}
          </label>
        </div>
        <div className="relative w-1/2">
          <input
            value={formState.cashOut}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(val)) {
                setFormState({ ...formState, cashOut: val });
              }
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowError(false)}
            className="peer w-full rounded-md border border-outline bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder-shown:border-outline focus:border-brand focus:ring-1 focus:ring-brand"
            placeholder=" "
            inputMode="decimal"
          />
          <label className="pointer-events-none absolute -top-2 left-2 z-10 bg-black px-1 text-xs font-medium text-brand transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-brand peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand dark:bg-black md:bg-white">
            Cash Out
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center mt-1">
        <button
          onClick={() => onRemove(player.id)}
          className="text-xs text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline underline-offset-2"
        >
          Remove Player
        </button>
        <div
          className={`text-right font-mono font-medium text-xs ${profit > 0 ? "text-green-600" : profit < 0 ? "text-red-500" : "text-brand"
            }`}
        >
          {profit > 0 ? "+" : ""}
          {profit.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

