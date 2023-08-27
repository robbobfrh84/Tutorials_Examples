def card_to_num(card):

    n = card[0]

    if (n == "T" or n == "J" or n == "Q" or n == "K"):
        n = 10
    elif (n == "A"):
        n = 1
    else:
        n = int(n)

    return n

def get_score(cards):
    total = 0
    for card in cards:
        total += card

    return total
