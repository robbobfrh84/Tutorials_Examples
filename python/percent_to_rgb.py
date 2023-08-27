def percent_to_rgb(c):
    return [(c[0]*255)/100,(c[1]*255)/100,(c[2]*255)/100]

percent_color = [ 39, 58, 92 ]

rgb_color = percent_to_rgb(percent_color)

print("percent_color: ", percent_color)
print("rgb_color: ", rgb_color)
