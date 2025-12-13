"use client";
import React from "react";

type Session = {
  id: string;
  title: string;
  date?: string;
};

export default function SessionList({ title, sessions, defaultOpen = true }: { title: string; sessions: Session[]; defaultOpen?: boolean; }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="w-full rounded-md border border-zinc-200">
      <button
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        onClick={() => setOpen((s) => !s)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-sm text-zinc-500">({sessions.length})</span>
        </div>
        <div className="text-sm text-zinc-500">{open ? "Hide" : "Show"}</div>
      </button>

      {open && (
        <div className="flex flex-col gap-2 px-4 pb-3">
          {sessions.length === 0 ? (
            <div className="text-sm text-zinc-500">No sessions</div>
          ) : (
            sessions.map((s) => (
              <div key={s.id} className="rounded-md border border-zinc-100 bg-white px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-zinc-500">{s.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
