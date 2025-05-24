const { Client, Intents, Permissions } = require('discord.js');
const db = require('quick.db');
var Premium1v = new db.table('Premium1');
var Premium2v = new db.table('Premium2');
var TempData = new db.table('TempData');
var sqlite3 = require('sqlite3').verbose();
var sqlDB = new sqlite3.Database('./json.sqlite');

const client = new Client({
    intents: [
      'GUILDS',
      'GUILD_VOICE_STATES',
      'GUILD_MESSAGES',
      'GUILD_MEMBERS',
    ],
  })

client.on("ready", async () => {
  setInterval(async function() {
      let guild = client.guilds.cache.get("907144429494730792")
          let array = TempData.all('ID')
          array.forEach(async id => {
            let userID = id.ID;     
            if((userID != null)){
              const mutualGuilds = client.guilds.cache.filter((guild) => {
                if(guild.members.cache.has(userID)){
                  guild.members.fetch(userID).then(member => {
                    if(member.roles.cache.has('959751204357931019') || member.roles.cache.has('912458122608660511')){
                      Premium1v.set(userID, true)
                    } else {
                      Premium1v.set(userID, false)
                    }
                    if(member.roles.cache.has('959751253200609302')){
                      Premium2v.set(userID, true)
                    } else {
                      Premium2v.set(userID, false)
                    }
                  })
                TempData.delete(userID);
               } else {
                 TempData.delete(id.ID);
               }
             });
            } else {
              TempData.delete(id.ID);
            }
          })
        
    }, 2500);
  })
  

  client.login("token")