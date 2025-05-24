const database = require('quick.db');
var prefixDB = new database.table('prefixDB')

exports.run = async (client, message, args, distube) => {
  let prefix = prefixDB.get(message.guild.id);
  
  args = message.content.slice(prefix.length).trim().split(' ')

  let embed = "";
  if(args[1] == "premium"){
    embed = {
      "description": "The Command 'premium' returns the link to purchase premium",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: premium",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "premium",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "premium",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "resume"){
    embed = {
      "description": "The Command 'resume' resumes the music",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: resume",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "resume",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "resume",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "stop"){
    embed = {
      "description": "The Command 'stop' stops the music",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: stop",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "stop",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "stop",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "prefix"){
    embed = {
      "description": "The Command 'prefix' changes your guilds prefix",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: prefix",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "prefix <new_prefix>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "prefix +",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "playlistClear"){
    embed = {
      "description": "The Command 'playlistClear' clears your entire playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: playlistClear",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "playlistClear",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "playlistClear",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "vote"){
    embed = {
      "description": "The Command 'vote' sends you link to vote",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: vote",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "vote",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "vote",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "Non-premium users need to vote every 12 hours to use the bot",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "volume"){
    embed = {
      "description": "The Command 'volume' let's you change the volume of the song",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: volume",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "volume <number>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "volume 100",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "stop"){
    embed = {
      "description": "The Command 'stop' disconnects the bot",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: stop",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "stop",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "stop",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This command does not work when running the other command 'onGoing'",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "skip"){
    embed = {
      "description": "The Command 'skip' skips the current song playing",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: skip",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "skip",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "skip",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "shuffle"){
    embed = {
      "description": "The Command 'shuffle' shuffles your queue",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: shuffle",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "shuffle",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "shuffle",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "previous"){
    embed = {
      "description": "The Command 'previous' plays the previous song in the queue",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: previous",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "previous",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "previous",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "playPlaylist"){
    embed = {
      "description": "The Command 'playPlaylist' plays your playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: playPlaylist",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "playPlaylist",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "playPlaylist",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This command may take to initially run",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "playlistRemove"){
    embed = {
      "description": "The Command 'playlistRemove' removes a song from your playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: playlistRemove",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "playlistRemove <song name>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "playlistRemove Alone",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This command may take some time",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "playlistAddQueue"){
    embed = {
      "description": "The Command 'playlistAddQueue' adds the Queue to your playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: playlistAddQueue",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "playlistAddQueue",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "playlistAddQueue",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This command may take a couple minutes to run",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "playlistAdd"){
    embed = {
      "description": "The Command 'playlistAdd' adds a song to your playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: playlistAdd",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "playlistAdd <song>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "playlistAdd Alone",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This command may take up to 3 minutes",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "ping"){
    embed = {
      "description": "The Command 'ping' sends you both our server and your latency",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: ping",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "ping",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "ping",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "move"){
    embed = {
      "description": "The Command 'move' lets you skip multiple songs at once",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: move",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "move <number of skips>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "move 2",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "lyrics"){
    embed = {
      "description": "The Command 'lyrics' sends you the lyrics of the song you are currently playing",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: lyrics",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "lyrics",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "lyrics",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "loop"){
    embed = {
      "description": "The Command 'loop' loops a song or queue",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: loop",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "loop <number 1,2,3>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "loop 2",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "Using Loop 1 would repeat the entire song, Using loop 2 would repeat the entire queue, Using loop 0 would disable loop",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "listPlaylist"){
    embed = {
      "description": "The Command 'listPlaylist' sends you a list of all the songs in your playlist",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: listPlaylist",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "listPlaylist <page number>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "listPlaylist 1",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "This commands could take up to 3 minutes to run",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "invite"){
    embed = {
      "description": "The Command 'invite' sends you a link to invite the bot to your server",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: invite",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "invite",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "invite",
          "inline": false
        },
      ]
    };
  }
  else if(args[1] == "filter"){
    embed = {
      "description": "The Command 'filter' allows you to add filters to the bot",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: filter",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "filter <name of filter>",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "filter bassboost",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "`To remove a filter you need to add the filter again`, `The command '" + prefix + "filter list' can also be used to get a list of all available filters`",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "autoplay"){
    embed = {
      "description": "The Command 'autoplay' lets us choose your song for you",
      "color": 9152956,
      "thumbnail": {
        "url": client.user.avatarURL()
      },
      "author": {
        "name": "Bait's Help: autoplay",
        "url": "",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Format",
          "value": prefix + "autoplay",
          "inline": false
        },
        {
          "name": "Example",
          "value": prefix + "autoplay",
          "inline": false
        },
        {
          "name": "Disclaimer",
          "value": "A Song needs to be in queue for autoplay to work",
          "inline": false
        }
      ]
    };
  }
  else if(args[1] == "247playlist"){
      embed = {
        "description": "The Command '247playlist' streams music from your playlist 24/7",
        "color": 9152956,
        "thumbnail": {
          "url": client.user.avatarURL()
        },
        "author": {
          "name": "Bait's Help: 247playlist",
          "url": "",
          "icon_url": client.user.avatarURL()
        },
        "fields": [
          {
            "name": "Format",
            "value": prefix + "247playlist",
            "inline": false
          },
          {
            "name": "Example",
            "value": prefix + "247playlist",
            "inline": false
          },
          {
            "name": "Disclaimer",
            "value": "When using 247playlist the bot can only be manually disconnect",
            "inline": false
          },
        ]
      };
    }
    else if(args[1] == "queue"){
      embed = {
        "description": "The Command 'queue' prints out all songs in queue",
        "color": 9152956,
        "thumbnail": {
          "url": client.user.avatarURL()
        },
        "author": {
          "name": "Bait's Help: queue",
          "url": "",
          "icon_url": client.user.avatarURL()
        },
        "fields": [
          {
            "name": "Format",
            "value": prefix + "queue <page number>",
            "inline": false
          },
          {
            "name": "Example",
            "value": prefix + "queue 1",
            "inline": false
          },
        ]
      };
    }
    else if(args[1] == "play"){
      embed = {
        "description": "The Command 'play' streams music",
        "color": 9152956,
        "thumbnail": {
          "url": client.user.avatarURL()
        },
        "author": {
          "name": "Bait's Help: play",
          "url": "",
          "icon_url": client.user.avatarURL()
        },
        "fields": [
          {
            "name": "Format",
            "value": prefix + "play <song name>",
            "inline": false
          },
          {
            "name": "Select",
            "value": "<number 1-10 on the list>",
            "inline": false
          },
          {
            "name": "Example Part 1",
            "value": prefix + "play Alone",
            "inline": false
          },
          {
            "name": "Example Part 2",
            "value": "1",
            "inline": false
          }
        ]
      };
    } else {
      embed = {
        "description": "Welcome to Bait's Help page",
        "color": 9152956,
        "footer": {
          "text": "Type `"+ prefix +"help <command>` for details on a command"
        },
        "thumbnail": {
          "url": client.user.avatarURL()
        },
        "author": {
          "name": "Bait's Help List",
          "url": "",
          "icon_url": client.user.avatarURL()
        },
        "fields": [
          {
            "name": "Music",
            "value": "`play`, `skip`, `stop`, `previous`, `queue`, `loop`, `move`, `volume`, `autoplay`, `shuffle`, `filter`, `lyrics`, `resume`",
            "inline": false
          },
          {
            "name": "Premium",
            "value": "`247playlist`, `playlistAdd`, `playPlaylist`, `playlistAddQueue`, `playlistClear`, `playRemove`, `playPlaylist`",
            "inline": false
          },
          {
            "name": "Utility",
            "value": "`help`, `invite`, `vote`, `ping`, `premium`",
            "inline": false
          },
          {
            "name": "💠 Vote for Bait",
            "value": "[Top.gg](https://top.gg/bot/510173952216268801/vote) - [discordbotlist](https://discordbotlist.com/bots/bait/upvote)",
            "inline": false
          },
          {
            "name": "🎧 Premium/Support",
            "value": "Join our support server [here](https://discord.gg/GGdzTyj6a6)\nPurchase premium [here](https://www.patreon.com/baitpremium?fan_landing=true)",
            "inline": false
          }
        ]
      };
    };

    message.channel.send({ embeds: [embed] }).catch((O_o) => { });
  }
