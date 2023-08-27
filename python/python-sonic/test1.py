from psonic import *
import random

# print(" - 1")
# for i in range(35):
#     play(random.randrange(10, 500))
#     sleep(0.1)
#
# sleep(1.5)
# print(" - 2")
# play(70) #play MIDI note 70
#
# sleep(2.5)
# print(" - 3")
# play(72)
# sleep(1)
# play(75)
# sleep(1)
# play(79)
#
# sleep(2.5)
# print(" - Notes")
# play(C3)
# sleep(1)
# play(G3)
# sleep(1)
# play(D3)

synth(SINE, note=D4)
synth(SQUARE, note=D4)
synth(TRI, note=D4, amp=0.4)
sleep(1.5)

for i in range(10):
    synth(SINE, note=D4+(i*0.1))
    sleep(0.5)

sleep(1.5)
play (60, attack=0.5, decay=1, sustain_level=0.4, sustain=2, release=0.5)

sleep(1.5)

use_synth(SAW)
play(38)
