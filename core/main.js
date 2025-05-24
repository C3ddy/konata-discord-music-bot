const { ShardingManager } = require('discord.js');
const { AutoPoster } = require('topgg-autoposter');
var fs = require('file-system');
const db = require('quick.db');
var sqlite3 = require('sqlite3').verbose();
var sqlDB = new sqlite3.Database('./json.sqlite');

var init = new db.table('init')
init.set("default", "default");

sqlDB.each("SELECT ID, json FROM init", function(err, row) {
    init.delete(row.ID);
});

const manager = new ShardingManager('./sub_cores/index.js', { token: "token", respawn: true });
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxMDE3Mzk1MjIxNjI2ODgwMSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM3NTE0NTU3fQ.Ga8MjpZwW41Orh0B9s7wfOHk3pWRU7w7ZdvN5EcmqLo', manager)
  
manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
    shard.on('ready', () => {
        console.log('Shard ready')
    })
    shard.on('disconnect', (a, b) => {
        console.log('Shard disconnected')
    })
    shard.on('reconnecting', (a, b) => {
        console.log('Shard reconnecting')
    })
    shard.on('death', (a, b) => {
        console.log('Shard died')
    })
});

ap.on('posted', () => {
    console.log('Posted stats to Top.gg!')
})

manager.spawn({ timeout: Infinity })