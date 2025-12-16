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
    to: player
    amount: number
}

function removeZeros(p: list of players):
    p = p.filter(player => player.profit != 0)
    return p

function matchSettlement(p: list of players, payments: list of Payment):
    i = 0
    matchFound = false
    while i < p.length:
        for j in range(i+1, len(p)): # check ahead
            if p[i].profit + p[j].profit == 0:
                # match and remove from list
                Payment payment = {
                    from: p[i].profit < 0 ? p[i] : p[j], # negative pays
                    to: p[i].profit < 0 ? p[j] : p[i], # positive receives
                    amount: abs(p[i].profit),
                }
                # remove p[i] and p[j] from list
                p.pop(j)
                p.pop(i)

                # add payment to list
                payments.push(payment)
                matchFound = true
        
            # break out of j loop once profit does not match
            else if abs(p[i].profit) != abs(p[j].profit):
                break
            else:
                break
        # if matchFound, i does not need to be incremented since we are
        # popping elements, naturally getting to the next element
        if !matchFound:
            i += 1
    return

# no more matches, use greedy algorithm
function greedySettlement(p: list of players, payments: list of Payment):
    sort p by profit
    while p.length > 0:

        # if most profit is greater than most loss
        if abs(p[-1].profit) > abs(p[0].profit):
            # biggest loser pays all loss to biggest winner
            Payment payment = {
                from: p[0],
                to: p[-1],
                amount: abs(p[0].profit),
            }
            payments.push(payment)

            # update winner profit: subtract payment (winnings gets closer to 0)
            p[-1].profit += p[-1].profit

            p.pop(0) # biggest loser accounted for; can be removed
            
        # if most loss is greater than most profit
        else if abs(p[0].profit) > abs(p[-1].profit):
            # biggest winner gets everything paid off by biggest loser
            Payment payment = {
                from: p[0],
                to: p[-1],
                amount: abs(p[0].profit),
            }
            payments.push(payment)

            # update loser profit: add payment (debt gets closer to 0)
            p[0].profit += p[-1].profit

            p.pop(-1) # can remove biggest winner 
            
        

function settlement(p: list of players):
    payments = Payment[]
    
    # remove players who broke even
    p = removeZeros(p)

    sort p by abs(profit)
    # try to find matches first
    matchSettlement(p, payments)

    # if no matches, use greedy algorithm
    greedySettlement(p, payments)

    return payments
*/