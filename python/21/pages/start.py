from os import system

def heading():
    system('clear')
    print("\n - *   BLACK JACK   * - \n")

def start():
    heading()
    cash = None
    while cash is None:
        userIn = input(" How much cash to start? (enter = $1000): $")
        if userIn == "":
            cash = 1000
        else:
            try:
                cash = int(userIn)
            except:
                print("   * Please enter a number")
                pass
    return cash
