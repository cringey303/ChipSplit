export type Player = {
    id: string;
    name: string;
    buyIn: string;
    cashOut: string;
};

export function calculateSettlement(players: Player[]) {
    const totalBuyIn = players.reduce((acc, player) => acc + Number(player.buyIn), 0); // sum of all buy-ins
    const totalCashOut = players.reduce((acc, player) => acc + Number(player.cashOut), 0); // sum of all cash-outs
    
    if (totalBuyIn !== totalCashOut) {
        console.log("Total buy-in does not equal total cash-out. Proceed anyway?");
    }

    const playerList = players.map((player) => {
        return {
            id: player.id,
            name: player.name,
            buyIn: Number(player.buyIn),
            cashOut: Number(player.cashOut),
        };
    });
    
}


/*
struct Payment {
    from: player
    to: player (multiple)
    amount: number (multiple)
}

function innerSettlement(p: list of players, i: int, payments: list of Payment):
    for j in range(i+1, len(p)):
        if p[i].profit + p[j].profit == 0:
            # match and remove from list
            Payment payment = {
                from: p[i],
                to: p[j],
                amount: p[i].profit,
            }
            # remove p[i] and p[j] from list
            p.pop(i)
            p.pop(j)

            # add payment to list
            payments.push(payment)
            return
        
        # break once abs(profit) do not equal each other
        else if abs(p[i].profit) != abs(p[j].profit):
            return
        else:
            return
    return

function settlement(p: list of players):
    payments = Payment[]
    sort p by abs(profit)

    # remove players who broke even
    while p[0].profit == 0:
        remove p[0] from list

    i = 0
    while i < p.length:
        # for every player with the same abs(profit), check if they can be paired
        # there may be >2 abs(profit) equal to each other, so iterate until not equal 
        innerSettlement(p, i, payments)
        i++
    
    sort p by profit
    while p.length > 0:
        # if most profit is greater than most loss
        if abs(p[-1].profit) > abs(p[0].profit):
            Payment payment = {
                from: p[0],
                to: p[-1],
                amount: abs(p[0].profit),
            }
            payments.push(payment)

            # subtract payment from profit
            p[-1].profit += p[-1].profit

            p.pop(0)
            
        
        # if most loss is greater than most profit
        else if abs(p[0].profit) > abs(p[-1].profit):
            Payment payment = {
                from: p[0],
                to: p[-1],
                amount: abs(p[0].profit),
            }
            payments.push(payment)

            # subtract payment from profit
            p[0].profit += p[-1].profit

            p.pop(-1)
            
        
    return payments
*/