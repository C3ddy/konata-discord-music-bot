
//Packages
const { Client, Intents, Permissions } = require('discord.js');
const DisTube = require('distube');
const fetch = require("node-fetch");
var fs = require('file-system');
const db = require('quick.db');

//Important variables
var membercount = 0;
var server = [];
var isServer = true;
let interval = null;

//Permissions
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
  ],
})

//Important varibales
let bool = false; //turn this to false
let clientDual;
let check = false;

var prefixDB = new db.table('prefixDB')
var Premium1 = new db.table('Premium1');
var Premium2 = new db.table('Premium2');
var TempPremium = new db.table('TempPremium')
var init = new db.table('init')


//Plugins included
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require('@distube/yt-dlp');

//Initilizing Distube client
let distube = new DisTube.default(client, {
    searchSongs: 10,
    searchCooldown: 30,
    emitNewSongOnly: true,
    leaveOnEmpty: false,
    emptyCooldown: 99999999999,
    leaveOnFinish: false,
    youtubeDL: false,
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

  if (!message.content.startsWith(prefix)) return;


  const args = message.content.slice(prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase();

  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
    const embed = {
        "description": "Seems to get an error here\nThe permissions SEND_MESSAGES isn't enabled!",
    };
    message.author.send({ embeds: [embed] });
    return;
  }

  const path = './premium_commands/' + cmd + '.js'

  try {
    if (!fs.existsSync(path)) {
      return;
      ;
    }
  } catch(err) {
    console.log(err);
  }

  if(cmd == '247playlist'){
    if(db.get(message.author.id)){
          let time = db.get(message.author.id);
          var currdatetime = new Date();
          let now = currdatetime.getTime();
          if(((now - time) / 3600000) >= 12){
            bool = false
          } else {
            bool = true
          }
        } else {
          bool = false
        }
      } else {
        bool = true
      }
    if((init.get(message.guild.id) == "truelive" || init.get(message.guild.id) == "falselive") || (init.get(message.guild.id) == "falseplay" && cmd == "247playlist") || (init.get(message.guild.id) == null && cmd == "247playlist")){

    let Premium1v = false;
    let Premium2v = false;
    try{
      Premium1v = Premium1.get(message.author.id);
      Premium2v = Premium2.get(message.guild.ownerId)
    } catch (e) {
      console.log(e);
    }

    if(Premium1v || Premium2v){
      try {
        delete require.cache[require.resolve(`../premium_commands/${cmd}.js`)];

        let commandFile = require(`../premium_commands/${cmd}.js`);
        commandFile.run(client, message, args, distube);
      } catch (e) {
        console.log(e)
      }
    } else {
      const embed = {
        "description": "You need to have Premium and be in our discord server to use this command\n\n:tada: **GIVEAWAY TIME** Buy premium now and get a chance to win **10$ Discord Nitro! **Check it out [here](https://www.patreon.com/baitpremium?fan_landing=true)",
        "color": 9152956
      };
      message.channel.send({ embeds: [embed] }).catch((O_o) => { });
    }
  } else if(init.get(message.guild.id) == "truelive" && cmd == "play" || init.get(message.guild.id) == "truelive" && cmd == "playplaylist"){
    return message.channel.send({ content: "You are currently playing a live! Please stop the live to play your song!" })
  } else {
    return;
  }
});


distube
  .on("playSong", (queue, song) => {
    init.set(`${queue.id}`, "truelive");

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
    init.set(`${queue.id}`, "truelive");

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
    init.set(`${queue.id}`, "falselive");
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

  console.log(client.user.username + " has logged in premium client!")

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