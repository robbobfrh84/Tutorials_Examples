def rgb_to_percent(c):
    return [(c[0]*100)/255,(c[1]*100)/255,(c[2]*100)/255]

rgb_color = [ 100, 149, 237 ]

percent_color = rgb_to_percent(rgb_color)

print("rgb_color: ", rgb_color)
print("percent_color: ", percent_color)
