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

    
}