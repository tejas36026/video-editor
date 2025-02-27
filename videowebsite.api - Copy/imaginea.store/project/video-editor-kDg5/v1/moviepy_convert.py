import requests
from moviepy.editor import concatenate_videoclips, VideoFileClip

# URLs of the GIFs
gif1_url = "https://media3.giphy.com/media/w8VuZaBbV7Adi/giphy.gif?cid=da20ff0bv2x6f6kugzm7iydma4gj0f3akxkmmxled3m7lwod&ep=v1_gifs_search&rid=giphy.gif&ct=g"
gif2_url = "https://media1.giphy.com/media/qu865rEor7r6xjaOyQ/giphy.gif?cid=da20ff0bt4yzasbagtz7cwc1gfqwrsykguq2mh0irkowtazb&ep=v1_gifs_search&rid=giphy.gif&ct=g"

# Download the GIFs
gif1_data = requests.get(gif1_url).content
gif2_data = requests.get(gif2_url).content

# Save the GIFs to local files
with open('gif1.gif', 'wb') as f:
    f.write(gif1_data)
with open('gif2.gif', 'wb') as f:
    f.write(gif2_data)

# Load the GIFs with moviepy
clip1 = VideoFileClip("gif1.gif")
clip2 = VideoFileClip("gif2.gif")

# Print the duration of each GIF
print(f"Duration of gif1: {clip1.duration} seconds")
print(f"Duration of gif2: {clip2.duration} seconds")

# Merge the GIFs and save the result
final_clip = concatenate_videoclips([clip1, clip2])
final_clip.write_gif("output.gif")

# Print the duration of the final output GIF
print(f"Duration of output gif: {final_clip.duration} seconds")