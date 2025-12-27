import { Payment } from "@/lib/settlement";
import { ArrowLeft } from "lucide-react";

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

    // Group payments by Payee (to)
    const pamentsByPayee = payments.reduce((acc, payment) => {
        if (!acc[payment.to]) {
            acc[payment.to] = [];
        }
        acc[payment.to].push(payment);
        return acc;
    }, {} as Record<string, Payment[]>);

    return (
        <div className="flex flex-col gap-3">
            {Object.entries(pamentsByPayee).map(([payee, payeePayments]) => (
                <div
                    key={payee}
                    className="flex flex-col rounded-md border border-outline bg-white p-4 dark:bg-black"
                >
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                        <span className="font-bold text-green-600">{payee}</span>
                        <ArrowLeft size={16} className="text-zinc-400" />
                        <div className="flex flex-wrap items-center gap-2">
                            {payeePayments.map((p, index) => (
                                <span key={index} className="flex items-center gap-1">
                                    {index > 0 && <span className="mr-2 text-zinc-400">,</span>}
                                    <span className="font-medium text-red-500">{p.from}</span>
                                    <span className="font-mono text-zinc-500">
                                        (${p.amount.toFixed(2)})
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
