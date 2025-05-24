# 🎵 Konata Discord Music Bot <br>

A powerful, feature-rich, and easy-to-use Discord music bot! Bring your server to life with high-quality music, playlists, filters, and more. Supports YouTube, Spotify, SoundCloud, and more! 

---

## ✨ Features

- 🎶 **Play music** from YouTube, Spotify, SoundCloud, and more
- 📃 **Playlists**: Create, add, remove, and manage playlists
- 🔊 **Audio Filters**: Bass boost, nightcore, and more
- ⏩ **Queue Management**: Skip, shuffle, loop, move, and shift songs
- ⏸️ **Pause/Resume**: Control playback easily
- 🎤 **Lyrics**: Fetch lyrics for the current song
- 🏆 **Premium Commands**: Unlock advanced features
- 🛡️ **Custom Prefix**: Set your own command prefix
- 🤖 **Invite**: Easy bot invite and voting

---

## 🚀 Installation

1. **Clone the repository**
   ```powershell
   git clone <repo-url>
   cd konata-discord-music-bot
   ```
2. **Install dependencies**
   ```powershell
   npm install
   ```
3. **Configure your bot**
   - Add your Discord bot token and other settings in the config file (see documentation).
4. **Run the bot**
   ```powershell
   node ./core/main.js
   # or for premium features
   python run.py
   ```

---

## 💡 Usage

Invite the bot to your server and use the following commands:

### 🎼 Music Commands
- `/play <song>` - Play a song
- `/pause` - Pause playback
- `/resume` - Resume playback
- `/skip` - Skip current song
- `/queue` - Show song queue
- `/stop` - Stop playback
- `/volume <1-100>` - Set volume
- `/loop` - Toggle loop
- `/shuffle` - Shuffle queue
- `/filter <type>` - Apply audio filter
- `/lyrics` - Get lyrics
- `/move <from> <to>` - Move song in queue
- `/previous` - Play previous song
- `/autoplay` - Toggle autoplay

### 📋 Playlist Commands
- `/playlistAdd <name> <song>` - Add song to playlist
- `/playlistRemove <name> <song>` - Remove song from playlist
- `/listPlaylist` - List all playlists
- `/playPlaylist <name>` - Play a playlist
- `/playlistClear <name>` - Clear a playlist
- `/playlistAddQueue <name>` - Add current queue to playlist

### 🛡️ Premium Commands
- `/premium` - Get premium info
- `/247playlist` - 24/7 playlist mode
- `/filter` - Premium audio filters

### ⚙️ Utility Commands
- `/prefix <new_prefix>` - Change command prefix
- `/invite` - Get bot invite link
- `/donate` - Support the bot
- `/ping` - Bot latency
- `/vote` - Vote for the bot
- `/setchannel` - Set music channel
- `/help` - Show help menu

---

## 🏆 Premium
Unlock advanced features and support development! Use `/premium` for more info.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 💬 Support
For help or questions, open an issue or contact the maintainer.

---

Enjoy your music! 🎶
