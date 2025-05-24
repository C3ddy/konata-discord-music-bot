const { Client, Intents, Permissions } = require('discord.js');
const DisTube = require('distube');
const fetch = require("node-fetch");
var fs = require('file-system');
const db = require('quick.db');

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
  ],
})

let bool = false;

var prefixDB = new db.table('prefixDB');
var Premium1 = new db.table('Premium1');
var Premium2 = new db.table('Premium2');
var TempData = new db.table('TempData');
var init = new db.table('init')


const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require('@distube/yt-dlp');

let distube = new DisTube.default(client, {
  searchSongs: 10,
  searchCooldown: 30,
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  emptyCooldown: 20,
  leaveOnFinish: true,
  youtubeDL: false,
  nsfw: true,
  leaveOnStop: true,
  plugins: [new SpotifyPlugin({
    emitEventsAfterFetching: true
  }), new SoundCloudPlugin(), new YtDlpPlugin()],
})

client.on('messageCreate', async message => {
  
  if(message.channel.id == 934736118228860938){
    var currdatetime = new Date();
    db.set(message.content, currdatetime.getTime())
  }
  
  let prefix = prefixDB.get(message.guild.id);

  if (message.author.bot) return;

  if (message.mentions.users.first()) {
    let user = message.mentions.users.first()
    const argsTemp = message.content.slice(user.length).trim().split(' ')
    if (user.id == client.user.id) {
      if(argsTemp[1] == 'prefix'){

        let prefix = prefixDB.get(message.guild.id);

        if (!message.channel.permissionsFor(client.user).has("ADMINISTRATOR")) {
          const embed = {
              "description": "Seems to get an error here\nThe permissions ADMINISTRATOR isn't enabled!",
          };
          return message.channel.send({ embeds: [embed] }).catch((O_o) => { });
        }

        if(!argsTemp[2]){
            return message.channel.send({ content: "The current prefix is `" + prefixDB.get(message.guild.id) + "`! Try doing `" + prefixDB.get(message.guild.id) + "help` for more commands!"}).catch((O_o) => { });
        } else {
            prefixDB.set(message.guild.id, argsTemp[2])
            return message.channel.send({ content: "You changed the prefix to `" + prefixDB.get(message.guild.id) + "`"}).catch((O_o) => { });
        }
      } else {
        return message.channel.send({ content: "The current prefix is `" + prefixDB.get(message.guild.id) + "`! Try doing `" + prefixDB.get(message.guild.id) + "help` for more commands!"}).catch((O_o) => { });
      }
    }
  }

  if (!message.content.startsWith(prefix)) return;


  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase();

  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
    const embed = {
        "description": "Seems to get an error here\nThe permissions SEND_MESSAGES isn't enabled!",
    };
    message.author.send({ embeds: [embed] }).catch((O_o) => { });
    return;
  }
  if (!message.channel.permissionsFor(client.user).has("ADD_REACTIONS")) {
    const embed = {
        "description": "Seems to get an error here\nThe permissions ADD_REACTIONS isn't enabled!",
    };
    message.author.send({ embeds: [embed] }).catch((O_o) => { });
    return;
  }

  const path = './commands/' + cmd + '.js'

  try {
    if (!fs.existsSync(path)) {
      return;
      ;
    }
  } catch(err) {
    console.log(err);
  }


    if((init.get(message.guild.id) == "trueplay") || (init.get(message.guild.id) == "falseplay") || (init.get(message.guild.id) == "falselive") || (init.get(message.guild.id) == null))
    {
      TempData.set(message.author.id, false);
      
          try {
            delete require.cache[require.resolve(`../commands/${cmd}.js`)];
      
            let commandFile = require(`../commands/${cmd}.js`);
            commandFile.run(client, message, args, distube);
          } catch (e) {
            console.log(e)
          }
    };
});

distube
  .on("playSong", (queue, song) => {
    init.set(`${queue.id}`, "trueplay");

    const embed = {
      "title": `${song.name}`,
      "color": 9152956,
      "thumbnail": {
        "url": `${song.thumbnail}`
      },
      "author": {
        "name": "Now Playing",
        "url": "https://discordapp.com",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Views Amount",
          "value": `${song.views}`,
          "inline": true
        },
        {
          "name": "Song Duration",
          "value": `${song.formattedDuration}`,
          "inline": true
        },
        {
          "name": "Requested By",
          "value": `${song.user}`,
          "inline": true
        }
      ]
    };
    queue.textChannel.send({ embeds: [embed] }).catch((O_o) => { });

  })
  .on("addSong", (queue, song) => {

    queue.textChannel.send('Added `' + song.name + '` by `' + song.uploader.name + '` to the queue').catch((O_o) => { });
  })
  .on("playList", (queue, playlist, song) => {
    init.set(`${queue.id}`, "trueplay");

    const embed = {
      "title": `${song.name}`,
      "color": 9152956,
      "thumbnail": {
        "url": `${song.thumbnail}`
      },
      "author": {
        "name": "Now Playing",
        "url": "https://discordapp.com",
        "icon_url": client.user.avatarURL()
      },
      "fields": [
        {
          "name": "Views Amount",
          "value": `${song.views}`,
          "inline": true
        },
        {
          "name": "Song Duration",
          "value": `${song.formattedDuration}`,
          "inline": true
        },
        {
          "name": "Requested By",
          "value": `${song.user}`,
          "inline": true
        }
      ]
    };
    queue.textChannel.send({ embeds: [embed] }).catch((O_o) => { });

  })

  .on("addList", (queue, playlist) => {
    const embed = {
      "description": `Importing ${playlist.songs.length} songs from playlist!`,
      "color": 9152956
    };
    queue.textChannel.send({ embeds: [embed] }).catch((O_o) => { });
  })
  .on('disconnect', queue => {
    init.set(`${queue.id}`, "falseplay");
  })
  .on('error', (textChannel, e) => {
    console.error(e);
    const embed = {
      "description": "Seems to get an error here\nPlease report this immediately [here](https://discord.gg/GGdzTyj6a6)",
    };
    return textChannel.send({ embeds: [embed] }).catch((O_o) => { });
  })
  .on("searchNoResult", (message, query) => message.channel.send("No result found for `" + query + "`!"))
  .on("searchResult", (message, result) => {
      let i = 0
      message.channel.send(
          `**Choose an option from below**\n${result
              .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
              .join("\n")}\n*Enter anything else or wait 30 seconds to cancel*`
      )
  })
  .on("searchCancel", message => message.channel.send(`Searching canceled`))
  .on("searchInvalidAnswer", message => message.channel.send(`Invalid number of result.`))
  .on("searchDone", () => {})

client.on("ready", async message => {
  const Guild = client.guilds.cache.map(guild => guild.id);
  for(var i = 0; i < Guild.length; i++){
    if(!(prefixDB.get(Guild[i]))){
      prefixDB.set(Guild[i], ';');
    }
  }

  client.user.setActivity(` ;help`, { type: 'LISTENING' });
  setInterval(async function() {
    client.user.setActivity(` ;help`, { type: 'LISTENING' });
  }, 300000)

  console.log(client.user.username + " has logged in and ready to play some music!")

});

client.on("guildCreate", async guild => {

  if(!(prefixDB.get(guild.id))){
    prefixDB.set(guild.id, ';');
  }

  let owner = await guild.fetchOwner()
  const embed = {
    "description": "Hey, I'm Bait! \n\nYou can start streaming music straight away without any setup, just join a vc and run the `;play` command!\n\nTo unlock other commands run `;help`\nTo change the prefix of the bot simply run `;prefix <new_prefix>`\nInvite me using this link: [bait.gg/invite](https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=274931608576)\n\nAnd lasty don't forget to join our support server for more updates in the futur! A fact is that this bot is still beta and receiving lots of bugs but our developers are doing there best to fix them as soon as possible: https://discord.gg/GGdzTyj6a6\n\nBefore you forget leave a review here:\n [Top.gg Page](https://top.gg/bot/510173952216268801)\n[DiscordBotListing Page](https://discordbotlist.com/bots/bait)",
    "color": 9152956
  };

  owner.send({ embeds: [embed] }).catch((O_o) => { });


});

client.on("guildDelete", async guild => {
  if(prefixDB.get(guild.id)){
    prefixDB.delete(guild.id);
  }
})

client.login("token")