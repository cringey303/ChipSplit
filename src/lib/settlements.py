# python settlement logic before implementing in typescript

class Payment:
    def __init__(self, from_name: str, to_name: str, amount: int):
        self.from_name = from_name
        self.to_name = to_name
        self.amount = amount

class Player:
    def __init__(self, name: str, buy_in: int, cash_out: int):
        self.name = name
        self.buy_in = buy_in
        self.cash_out = cash_out
        self.profit = cash_out - buy_in
    
    def get_abs_profit(self):
        return abs(self.profit)
    
    def __gt__(self, other: Player):
        return self.profit > other.profit
    
    def __lt__(self, other: Player):
        return self.profit < other.profit
    
    def __eq__(self, other: Player):
        return self.profit == other.profit

def remove_zeros(p: list[Player]):
    # filter out players with 0 profit
    return [player for player in p if player.profit != 0]

def match_settlement(p: list[Player], payments: list[Payment]):
    i = 0
    while i < len(p):
        matchFound = False
        # look for a perfect match
        for j in range(i + 1, len(p)):
            if p[i].profit + p[j].profit == 0:
                # match and remove from list
                # negative pays, positive receives
                if p[i].profit < 0:
                    payer = p[i]
                    receiver = p[j]
                else:
                    payer = p[j]
                    receiver = p[i]
                
                payment = Payment(payer.name, receiver.name, abs(p[i].profit))
                
                # remove p[j] first (larger index) to avoid shifting p[i]
                p.pop(j)
                p.pop(i)
                
                # add payment to list
                payments.append(payment)
                matchFound = True
                break
        
        # if matchFound, we removed the element at i, so the next element 
        # is now at i. We do not increment i.
        if not matchFound:
            i += 1
            
    return

# no more matches, use greedy algorithm
def greedy_settlement(p: list[Player], payments: list[Payment]):
    # Sort by profit: most negative first, most positive last
    p.sort(key=lambda x: x.profit)
    
    while len(p) > 1:
        loser = p[0]
        winner = p[-1]
        
        amount = min(abs(loser.profit), winner.profit)
        
        payment = Payment(loser.name, winner.name, amount)
        payments.append(payment)
        
        loser.profit += amount
        winner.profit -= amount
        
        if loser.profit == 0:
            p.pop(0)
        
        if winner.profit == 0:
            if loser.profit != 0: 
                p.pop(-1)
            else:
                if len(p) > 0:
                    p.pop(-1)

def settlement(p: list[Player]):
    payments: list[Payment] = []
    
    # remove players who broke even
    p = remove_zeros(p)

    # sort p by abs(profit)
    p.sort(key=lambda p: p.get_abs_profit())

    # try to find matches first
    match_settlement(p, payments)

    # if no matches, use greedy algorithm
    greedy_settlement(p, payments)

    return payments

def printPayments(payments: list[Payment]):
    for p in payments:
        print(f"{p.from_name} ${p.amount}-> {p.to_name}")
    return

def main():
    p = [Player('lucas', 33.33, 0),  # -10
         Player('nigel', 33.33, 0),   # -20
         Player('kenny', 33.34, 0),  # +30
         Player('winnie', 0, 100), # -5
         Player('winston', 10, 10)] # +5

    printPayments(settlement(p))

if __name__ == "__main__":
    main()