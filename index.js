const mineflayer = require('mineflayer')

function createBot () {
  const bot = mineflayer.createBot({
    host: 'sl.extremecraft.net',
    username: 'BOT',
    version: '1.16.5',
  })

  bot.on('spawn', () => {
    bot.chat('/register bot123 bot123')
    setTimeout(() => {
      bot.chat('/login bot123')
    }, 1000)

    // After login, open compass menu


    
  bot.on('kicked', console.log)
  bot.on('error', console.log)
  bot.on('end', createBot)
}

createBot()
