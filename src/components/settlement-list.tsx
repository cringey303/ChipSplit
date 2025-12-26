import { Payment } from "@/lib/settlement";
import { ArrowRight } from "lucide-react";

type SettlementListProps = {
    payments: Payment[];
};

export default function SettlementList({ payments }: SettlementListProps) {
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
            {payments.map((payment, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-outline bg-white p-4 dark:bg-black"
                >
                    <div className="flex w-full items-center gap-2 font-medium">
                        <span className="text-red-500">{payment.from}</span>
                        <span className="flex items-center gap-1 text-zinc-400">
                            <span>(${payment.amount.toFixed(2)})</span>
                            <ArrowRight size={16} />
                        </span>
                        <span className="text-green-600">{payment.to}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
