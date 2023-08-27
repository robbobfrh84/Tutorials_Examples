from os import system

from toolkit.shuffle import shuffles
from toolkit.deal import deal
from toolkit.deck import *

from pages.start import start
from pages.place_bet import place_bet
from pages.player_turn import player_turn


class Game:
    def __init__(self,min,max):
        self.min = min
        self.max = max
        self.shoot = []
        self.remain = []


def main():

    game = Game(10,1000)
    game.cash = start()
    game.bet = place_bet(game)
    game.deck = shuffles(4, deck)
    game.remain = game.deck[:len(game.deck)]

    deal(game)
    # player_turn(game)

    print("\n- - - - notes - - - - \ndeck")
    print("\nshoot", game.shoot)
    print("\nremain", game.remain)
    print("\nOG deck", game.deck)

main()
