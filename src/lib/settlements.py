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
    sorted(p)
    while p[0].profit == 0:
        p.pop(0)
    return p

def match_settlement(p: list[Player], payments: list[Payment]):
    i = 0
    matchFound = False
    while i < len(p)-1:
        for j in range(i+1, len(p)-1): # check ahead
            if p[i].profit + p[j].profit == 0:
                # match and remove from list
                # negative pays, positive receives
                from_name = [p[i].name if p[i].profit < 0 else p[j].name]
                to_name = [p[j].name if p[i].profit < 0 else p[i].name]
                payment = Payment(from_name, to_name, abs(p[i].profit))
                # remove p[i] and p[j] from list
                p.pop(j)
                p.pop(i)

                # add payment to list
                payments.append(payment)
                matchFound = True
        
            # break out of j loop once profit does not match
            elif abs(p[i].profit) != abs(p[j].profit):
                break
            else:
                break

        # if matchFound, i does not need to be incremented since we are
        # popping elements, naturally getting to the next element
        if not matchFound:
            i += 1
        printPayments(payment)
        
    return

# no more matches, use greedy algorithm
def greedy_settlement(p: list[Player], payments: list[Payment]):
    sorted(p) # sort p by profit
    while p.length > 0:

        # if most profit is greater than most loss
        if abs(p[-1].profit) > abs(p[0].profit):
            # biggest loser pays all loss to biggest winner
            payment = Payment(p[0], p[-1], abs(p[0].profit))
            payments.push(payment)

            # update winner profit: subtract payment (winnings gets closer to 0)
            p[-1].profit += p[-1].profit

            p.pop(0) # biggest loser accounted for; can be removed
            
        # if most loss is greater than most profit
        elif abs(p[0].profit) > abs(p[-1].profit):
            # biggest winner gets everything paid off by biggest loser
            payment = Payment(p[0], p[-1], abs(p[0].profit))
            payments.push(payment)

            # update loser profit: add payment (debt gets closer to 0)
            p[0].profit += p[-1].profit

            p.pop(-1) # can remove biggest winner 

def settlement(p: list[Player]):
    payments = [Payment]
    
    # remove players who broke even
    p = remove_zeros(p)

    # sort p by abs(profit)
    sorted(p, key=lambda p: p.get_abs_profit())
    printPayments(payments)

    # try to find matches first
    match_settlement(p, payments)
    printPayments(payments)

    # if no matches, use greedy algorithm
    greedy_settlement(p, payments)

    return payments

def printPayments(payments: list[Payment]):
    for p in payments:
        print(f"{p.from_name} ${p.amount}-> {p.to_name}\n")
    return

def main():
    p = [Player('lucas', 10, 10),  # 0
         Player('nigel', 10, 5),   # -5
         Player('kenny', 10, 15),  # +5
         Player('winnie', 10, 20), # +10
         Player('winston', 10, 0)] # -10

    printPayments(settlement(p))

if __name__ == "__main__":
    main()