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

function settlement(p: list of players):
    payments = [Payment]
    sort p by abs(profit)

    while p[0].profit == 0:
        remove p[0] from list

    for i in range(len(p)):
        # for every player with the same abs(profit), check if they can be paired
        for j in range(i+1, len(p)):

            if p[i].profit + p[j].profit == 0:
                # match and remove from list
                payment = {
                    from: p[i],
                    to: p[j],
                    amount: p[i].profit,
                }
            else if abs(p[i].profit) != abs(p[j].profit):
                break
            
            remove p[i] from list
            remove p[j] from list
            append payment to list 
            

*/