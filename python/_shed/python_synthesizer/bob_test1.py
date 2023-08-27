import time

from synthesizer import Player, Synthesizer, Waveform

BASE = 261.626  # C4

def main():
    player = Player()
    player.open_stream()

    print("play square wave")
    synthesizer = Synthesizer(
        osc1_waveform = Waveform.square,
        osc1_volume = 0.5,
        use_osc2 = False
    )
    player.play_wave(synthesizer.generate_constant_wave(140.0, 0.5))
    time.sleep(0.5)

    print("Build 1")
    build = 0.0

    for i in range(100):
        player.play_wave(synthesizer.generate_constant_wave(build, 0.01))
        build += 5.0

    build = 0.0
    for i in range(200):
        # player.play_wave(synthesizer.generate_constant_wave(build, 0.01))
        player.play_wave(synthesizer.generate_constant_wave(500-build, 0.005))
        build += 2.5


    # print("- Sine Waves - ")
    # synthesizer = Synthesizer(
    #     osc1_waveform = Waveform.sine,
    #     osc1_volume = 1.0,
    #     use_osc2=False
    # )
    # print("Boomp")
    # player.play_wave(synthesizer.generate_constant_wave(440.0, 0.5))
    # time.sleep(0.5)
    # print("Booump")
    # player.play_wave(synthesizer.generate_constant_wave(240.0, 0.5))
    # time.sleep(0.5)
    #
    # print("Bloop")
    # player.play_wave(synthesizer.generate_constant_wave(240.0, 0.1))
    # time.sleep(0.01)
    # player.play_wave(synthesizer.generate_constant_wave(250.0, 0.1))
    # time.sleep(0.5)
    #
    # build = 150.0
    #
    # print("Build 1")
    # for i in range(30):
    #     player.play_wave(synthesizer.generate_constant_wave(build, 0.01))
    #     build += 10.0
    #     time.sleep(0.01)
    #
    # time.sleep(0.5)
    # build = 250.0
    #
    # print("Build 2")
    # for i in range(100):
    #     player.play_wave(synthesizer.generate_constant_wave(build, 0.01))
    #     build += 1.0
    #     time.sleep(0.01)
    #
    # time.sleep(0.5)


if __name__ == '__main__':
    main()
