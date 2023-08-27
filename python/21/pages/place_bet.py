from os import system
from time import sleep

def heading(cash):
    system('clear')
    print("\n - *   BLACK JACK   * -       Cash: $"+cash)
    print("\n Bet - - - Min = $10, Max: $1000\n")

def place_bet(game):
    heading(str(game.cash))

    if (game.cash < game.min):
        print(" \n\n :-( Sorry, It looks like you don't have enought cash :-(")
        print(" You only have $"+str(game.cash))
        print(" and the min bet is $"+str(game.min))
        sleep(8)
        print("\n ...Good bye! \n")
        sleep(1)
        return " * No Bet * "

    else:
        bet = None
        while bet is None:

            userIn = input(" Place your bet? (enter = min): $")
            if userIn == "":
                userIn = str(game.min)

            try:
                bet = int(userIn)
            except:
                print("   * please enter a number")
                continue

            if int(userIn) < game.min:
                print("   * You can't bet less than the min bet $"+str(game.min))
                bet = None
            elif int(userIn) > game.max:
                print("   * You can't bet more than the max bet $"+str(game.max))
                bet = None

        return bet
