from random import randint as rand

def shuffles(times, deck):
    shuffled = deck
    for i in range(times):
        shuffled = shuffle(shuffled)
    return shuffled

def shuffle(deck):
    shuffled = []
    while len(deck) > 0:
        drawIndex = rand(0,len(deck)-1)
        shuffled.append(deck[drawIndex])
        del deck[drawIndex]
    return shuffled
