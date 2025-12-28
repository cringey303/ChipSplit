import { Payment } from "@/lib/settlement";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

type SettlementListProps = {
    payments: Payment[];
};

type SettlementGroup = {
    type: "payer" | "payee";
    mainName: string;
    items: Payment[];
};

export default function SettlementList({ payments }: SettlementListProps) {
    // Greedy algorithm to minimize lines
    const groups = useMemo(() => {
        let pool = [...payments];
        const result: SettlementGroup[] = [];

        while (pool.length > 0) {
            // Calculate counts for remaining payments
            const counts = new Map<string, { asPayer: Payment[]; asPayee: Payment[] }>();

            for (const p of pool) {
                if (!counts.has(p.from)) counts.set(p.from, { asPayer: [], asPayee: [] });
                if (!counts.has(p.to)) counts.set(p.to, { asPayer: [], asPayee: [] });

                counts.get(p.from)!.asPayer.push(p);
                counts.get(p.to)!.asPayee.push(p);
            }

            let bestName = "";
            let bestType: "payer" | "payee" = "payee";
            let maxCount = -1;

            for (const [name, data] of counts.entries()) {
                const payeeCount = data.asPayee.length;
                const payerCount = data.asPayer.length;

                // Check Payee (preferred)
                if (payeeCount > maxCount) {
                    maxCount = payeeCount;
                    bestName = name;
                    bestType = "payee";
                } else if (payeeCount === maxCount && bestType === "payer") {
                    // Tie-breaker: Switch to Payee if we were on Payer
                    bestName = name;
                    bestType = "payee";
                }

                // Check Payer
                // Must be strictly greater to override a Payee of same count (tie-breaker logic)
                if (payerCount > maxCount) {
                    maxCount = payerCount;
                    bestName = name;
                    bestType = "payer";
                }
            }

            // Should not happen if pool > 0, but safety check
            if (maxCount === -1 || !bestName) break;

            const data = counts.get(bestName)!;
            const matched = bestType === "payee" ? data.asPayee : data.asPayer;

            result.push({
                type: bestType,
                mainName: bestName,
                items: matched,
            });

            // Remove matched from pool
            const matchedSet = new Set(matched);
            pool = pool.filter((p) => !matchedSet.has(p));
        }

        // Sort: Payees (Green) first, Payers (Red) last
        return result.sort((a, b) => {
            if (a.type === b.type) return 0;
            return a.type === "payee" ? -1 : 1;
        });
    }, [payments]);

    if (payments.length === 0) {
        return (
            <div className="flex  h-64 flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
                <p>No payments needed.</p>
                <p className="text-sm">Everyone is square!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {groups.map((group, i) => (
                <div
                    key={`${group.mainName}-${i}`}
                    className="flex flex-col rounded-md border border-outline bg-white p-4 dark:bg-black"
                >
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                        {group.type === "payee" ? (
                            // Payee Group: Green <--- Reds
                            <>
                                <span className="font-bold text-green-600">{group.mainName}</span>
                                <ArrowLeft size={16} className="text-zinc-400" />
                                <div className="flex flex-wrap items-center gap-2">
                                    {group.items.map((p, index) => (
                                        <span key={index} className="flex items-center gap-1">
                                            {index > 0 && <span className="mr-2 text-zinc-400">,</span>}
                                            <span className="font-medium text-red-500">{p.from}</span>
                                            <span className="font-mono text-zinc-500">
                                                (${p.amount.toFixed(2)})
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // Payer Group: Red ---> Greens
                            <>
                                <span className="font-bold text-red-500">{group.mainName}</span>
                                <ArrowRight size={16} className="text-zinc-400" />
                                <div className="flex flex-wrap items-center gap-2">
                                    {group.items.map((p, index) => (
                                        <span key={index} className="flex items-center gap-1">
                                            {index > 0 && <span className="mr-2 text-zinc-400">,</span>}
                                            <span className="font-medium text-green-600">{p.to}</span>
                                            <span className="font-mono text-zinc-500">
                                                (${p.amount.toFixed(2)})
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
