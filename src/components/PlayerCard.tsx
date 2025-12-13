"use client";
import React from "react";
import type { Player } from "./PlayerForm";

export default function PlayerCard({ player, onRemove }: { player: Player; onRemove?: (id: string) => void }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md border border-zinc-200 bg-white p-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{player.name}</span>
        <div className="mt-1 flex gap-3 text-xs text-zinc-600">
          <span>Buy-In: {player.buyIn || "—"}</span>
          <span>Cash Out: {player.cashOut || "—"}</span>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(player.id)}
          className="ml-2 rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-200"
          aria-label={`Remove ${player.name}`}
        >
          Remove
        </button>
      )}
    </div>
  );
}
