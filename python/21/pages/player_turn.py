from os import system

def heading(cash, bet, dlr, plr):
    system('clear')
    print("\n - *   BLACK JACK   * -       Cash: $"+cash )
    print("\n Your Bet: $"+bet )
    print("\n     Dealer has: ", dlr.showing)
    print("     Player has: ", plr.showing, plr.hidden)

def player_turn(game):

    heading(str(game.cash), str(game.bet), game.dealer_hand, game.player_hand )
    tot(game.player_hand)

    turn = None
    while turn is None:
        userIn = input("\n ...hit or stand? [s/h]: ")

        if userIn != 'h' and userIn != 's':
            print("   * please enter 'h' or 's' ")
            continue

        turn = userIn

    if turn == 'h':
        print("you hit!", game.deck[6])
    else:
        print("you stand", game.player_hand.showing, game.player_hand.hidden)

def tot(hand):
    print("score calc...")
    
    print(hand.showing[0])
    print(hand.hidden[0])
