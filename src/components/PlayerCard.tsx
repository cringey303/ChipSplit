"use client";
import React, { useState } from "react";

export type Player = {
  id: string;
  name: string;
  buyIn: string;
  cashOut: string;
};

type PlayerCardProps = {
  player: Player;
  onRemove: (id: string) => void;
  onUpdate: (player: Player) => void;
  defaultEditing?: boolean;
  playerNumber?: number;
};

export default function PlayerCard({
  player,
  onRemove,
  onUpdate,
  defaultEditing = false,
  playerNumber,
}: PlayerCardProps) {
  const [isEditing, setIsEditing] = useState(defaultEditing);
  const [formState, setFormState] = useState(player);
  const [showError, setShowError] = useState(false);

  const profit = Number(formState.cashOut) - Number(formState.buyIn);
  const isProfitPositive = profit >= 0;

  const handleSave = () => {
    if (!formState.buyIn) {
      setShowError(true);
      return;
    }
    onUpdate(formState);
    setIsEditing(false);
    setShowError(false);
  };

  if (isEditing) {
    return (
      <div className="flex w-full flex-col gap-3 rounded-md border border-outline bg-white p-4 dark:bg-black">
        <label className="flex w-full flex-col gap-1">
          <span className="text-sm font-medium">Name</span>
          <input
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            onFocus={() => setShowError(false)}
            className="w-full rounded-md border border-outline px-3 py-2 text-sm bg-transparent"
            placeholder="Player name"
            autoFocus
          />
        </label>

        <div className="flex gap-3">
          <label className="flex w-1/2 flex-col gap-1">
            <span className="text-sm font-medium">
              Buy-In {showError && <span className="text-red-500">*</span>}
            </span>
            <input
              value={formState.buyIn}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(val)) {
                  setFormState({ ...formState, buyIn: val });
                }
              }}
              onFocus={() => setShowError(false)}
              className={`w-full rounded-md border px-3 py-2 text-sm bg-transparent ${showError ? "border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500" : "border-outline"
                }`}
              placeholder="0.00"
              inputMode="decimal"
            />
          </label>
          <label className="flex w-1/2 flex-col gap-1">
            <span className="text-sm font-medium">Cash Out</span>
            <input
              value={formState.cashOut}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d{0,2}$/.test(val)) {
                  setFormState({ ...formState, cashOut: val });
                }
              }}
              onFocus={() => setShowError(false)}
              className="w-full rounded-md border border-outline px-3 py-2 text-sm bg-transparent"
              placeholder="0.00"
              inputMode="decimal"
            />
          </label>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            onClick={() => onRemove(player.id)}
            className="cursor-pointer rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/40"
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="cursor-pointer rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-outline bg-white p-4 dark:bg-black">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{formState.name || (playerNumber ? `Player ${playerNumber}` : "Player")}</h3>
          <div className="mt-1 flex gap-4 text-sm text-zinc-500">
            <span>Buy-In: {formState.buyIn || "0"}</span>
            <span>Cash Out: {formState.cashOut || "0"}</span>
          </div>
        </div>
        <div className={`text-right font-mono font-medium ${isProfitPositive ? "text-green-600" : "text-red-500"}`}>
          {isProfitPositive ? "+" : ""}
          {profit.toFixed(2)}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onRemove(player.id)}
          className="cursor-pointer rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/40"
        >
          Delete
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 cursor-pointer rounded-md border border-outline px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
