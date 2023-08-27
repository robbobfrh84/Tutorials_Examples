from toolkit.scoring import card_to_num, get_score

class Hand:
    def __init__(self, hidden, showing):
        self.hidden = hidden
        self.showing = showing
        self.card_nums = [card_to_num(hidden), card_to_num(showing)]
    #
    # def set_score(self):
    #     self.card_nums =  get_score(self.card_nums)


def deal(game):
    game.dealer_hand = Hand(game.remain[1], game.remain[3])
    game.player_hand = Hand(game.remain[0], game.remain[2])
    # self.score = get_score(self.card_nums)
    # 🚨 REALLLYYYY make scoring.py part of Hand
    game.player_hand.score = get_score(game.player_hand.card_nums)

    print("\n\n-----")
    print(game.player_hand.card_nums)
    print(game.player_hand.score)
    print("-----\n\n")

    game.shoot = game.remain[:4]
    game.remain = game.remain[4-len(game.remain):]
