from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from moviepy.editor import concatenate_videoclips, VideoFileClip

app = Flask(__name__)

# CORS(app, origins=["http://127.0.0.1:5500", "file:///D:/videowebsite.api/dev.naxotop.com/project/video-editor-kDg5/v1/index.html"])
CORS(app, origins="*")

@app.route('/', methods=['OPTIONS'])
def analyze_options():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST"
    }

@app.after_request
def after_request(response):

  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
  # response.headers.add('Access-Control-Allow-Origin', 'https://tangible-super-manchego.glitch.me')
  return response

@app.route('/', methods=['POST'])
def handle_request():
    data = request.get_json()
    urls = data['urls']

    clips = []
    for i, url in enumerate(urls, start=1):
        print(f"This is the {i}th URL: {url}")

        response = requests.get(url)

        # Ensure the request was successful and the content is a GIF
        if response.status_code == 200 and 'gif' in response.headers['Content-Type']:
            gif_data = response.content

            gif_filename = f'gif{i}.gif'
            with open(gif_filename, 'wb') as f:
                f.write(gif_data)

            clip = VideoFileClip(gif_filename)

            print(f"Duration of gif{i}: {clip.duration} seconds")

            clips.append(clip)

    final_clip = concatenate_videoclips(clips)
    final_clip.write_gif("output.gif")
    return send_file('output.gif', mimetype='image/gif')

if __name__ == '__main__':
    app.run(debug=True, port=5001)