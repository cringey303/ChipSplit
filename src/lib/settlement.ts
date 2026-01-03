export type Player = {
    id: string;
    name: string;
    buyIn: number;
    cashOut: number;
    profit: number;
};

export type Payment = {
    from: string;
    to: string;
    amount: number;
};



function removeZeros(p: Player[]): Player[] {
    // filter out players with 0 profit (allowing for small float errors)
    return p.filter(player => Math.abs(player.profit) > 0.001);
}

// match players with equal losses/gains and remove them from player pool
function matchSettlement(p: Player[], payments: Payment[]): void {
    let i = 0;
    while (i < p.length) {
        let matchFound = false;
        // look for a perfect match
        for (let j = i + 1; j < p.length; j++) {
            // Check if profits sum to 0 (approx)
            if (Math.abs(p[i].profit + p[j].profit) < 0.001) {
                // match and remove from list
                // negative pays, positive receives
                let payer: Player;
                let receiver: Player;

                if (p[i].profit < 0) {
                    payer = p[i];
                    receiver = p[j];
                } else {
                    payer = p[j];
                    receiver = p[i];
                }

                const amount = Math.abs(p[i].profit);
                const payment: Payment = {
                    from: payer.name,
                    to: receiver.name,
                    amount: Number(amount.toFixed(2)),
                };

                // remove p[j] first (larger index) to avoid shifting p[i]
                p.splice(j, 1);
                p.splice(i, 1);

                // add payment to list
                payments.push(payment);
                matchFound = true;
                break;
            }
        }

        // if matchFound, we removed the element at i, so the next element 
        // is now at i. We do not increment i.
        if (!matchFound) {
            i++;
        }
    }
}

function greedySettlement(p: Player[], payments: Payment[]): void {
    // Sort by profit: most negative first, most positive last
    p.sort((a, b) => a.profit - b.profit);

    while (p.length > 1) {
        const loser = p[0];
        const winner = p[p.length - 1];

        const amount = Math.min(Math.abs(loser.profit), winner.profit);

        // Only create payment if amount is significant
        if (amount > 0.001) {
            const payment: Payment = {
                from: loser.name,
                to: winner.name,
                amount: Number(amount.toFixed(2)),
            };
            payments.push(payment);
        }

        loser.profit += amount;
        winner.profit -= amount;

        // Handle floating point precision
        loser.profit = Math.round(loser.profit * 100) / 100;
        winner.profit = Math.round(winner.profit * 100) / 100;

        if (Math.abs(loser.profit) < 0.001) {
            p.shift(); // remove first element (loser)
        }

        if (Math.abs(winner.profit) < 0.001) {
            // We need to find the winner again because indices might have shifted if we popped loser
            // But since winner was at the end, if we popped head, winner is still at p.length-1
            // However, use indexOf to be safe or just pop last if we are sure
            const winnerIdx = p.indexOf(winner);
            if (winnerIdx !== -1) {
                p.splice(winnerIdx, 1);
            }
        }
    }
}

export function calculateSettlement(players: Player[]): Payment[] {
    const totalBuyIn = players.reduce((acc, player) => acc + Number(player.buyIn), 0);
    const totalCashOut = players.reduce((acc, player) => acc + Number(player.cashOut), 0);

    if (Math.abs(totalBuyIn - totalCashOut) > 0.01) {
        console.warn(`Total buy-in (${totalBuyIn}) does not equal total cash-out (${totalCashOut}).`);
    }

    // Clone players to avoid mutating the original array (since we modify profit)
    // We trust the passed profit value as per request.
    let settlementPlayers: Player[] = players.map(p => ({ ...p }));

    const payments: Payment[] = [];

    // remove players who broke even
    settlementPlayers = removeZeros(settlementPlayers);

    // sort by profit (ascending)
    settlementPlayers.sort((a, b) => a.profit - b.profit);

    // try to find matches first
    matchSettlement(settlementPlayers, payments);

    // if no matches, use greedy algorithm
    greedySettlement(settlementPlayers, payments);

    return payments;
}