import base64
from io import BytesIO
from PIL import Image
import os
import json
from tinytag import TinyTag # type: ignore
import jsonpickle # type: ignore

# Get a list of all songs
song_dir = 'src\\Songs'
songs = os.listdir(song_dir)

# Create a list with indices as keys and song metadata as values
song_dict = {}
importstring = ""
for i, song in enumerate(songs):
    try:
        tag = TinyTag.get(os.path.join(song_dir, song), image=True)            
            #dumping whole tag 
            # with open("test.json", "w") as outfile:
            #     outfile.write(json.dumps(json.loads(jsonpickle.encode(tag)), indent=4))
            
        song_dict[i] = {
            'id': i,
            # 'tag': tag,
            'album': tag.album if tag.album else "NONE",
            'albumartist': tag.albumartist if tag.albumartist else "NONE",
            'artist': tag.artist if tag.artist else "NONE",
            'audio_offset': tag.audio_offset if tag.audio_offset else "NONE",
            'bitdepth': tag.bitdepth if tag.bitdepth else "NONE",
            'bitrate': tag.bitrate if tag.bitrate else "NONE",
            'comment': tag.comment if tag.comment else "NONE",
            'composer': tag.composer if tag.composer else "NONE",
            'disc': tag.disc if tag.disc else "NONE",
            'disc_total': tag.disc_total if tag.disc_total else "NONE",
            'duration': tag.duration if tag.duration else "NONE",
            'filesize': tag.filesize if tag.filesize else "NONE",
            'genre': tag.genre if tag.genre else "NONE",
            'samplerate': tag.samplerate if tag.samplerate else "NONE",
            'title': tag.title if tag.title else "NONE",
            'track': tag.track if tag.track else "NONE",
            'track_total': tag.track_total if tag.track_total else "NONE",
            'year': tag.year if tag.year else "NONE",
            'extra': tag.extra if tag.extra else "NONE",
            'file': song if song else "NONE",
            'path': os.path.join(song_dir, song) if song else "NONE",             
        }
        # import sound from './Songs/frankoceantest.mp3'

        importstring += "import sound"+str(i)+' from "./Songs/'+song+'";\n'
                
        if not tag.album: continue
        with open(f"src\\Assets\\AlbumArt\\{tag.album if tag.album else 'NONE'}.jpeg", 'wb') as file:
            data = tag.get_image()
            image = Image.open(BytesIO(data))
            img = file.write(data)
    except Exception as e:
        print(f"Error processing file {song}: {e}")

# Write the dictionary to a text file
with open('song_dict.json', 'w') as f:
    f.write(json.dumps(song_dict, indent=4))

with open('importstring.txt', 'w') as f:
    f.write(importstring.replace("�$", "¥$"))