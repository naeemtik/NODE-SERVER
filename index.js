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
    setTimeout(() => {
      const compass = bot.inventory.items().find(i => i.name.includes('compass'))
      if (compass) {
        bot.equip(compass, 'hand').then(() => {
          bot.activateItem() // opens the world selector
          console.log("Compass used, opening selector...")
        }).catch(console.log)
      } else {
        console.log("No compass found in inventory.")
      }
    }, 3000)
  })

  // When the GUI opens (the world selector menu)
  bot.on('windowOpen', (window) => {
    console.log("World selector opened!")

    // Find "Survival" item by name (grass_block)
    const survivalSlot = window.slots.findIndex(item => item && item.name === 'grass_block')
    if (survivalSlot !== -1) {
      setTimeout(() => {
        bot.clickWindow(survivalSlot, 0, 0) // left click on the Survival grass block
        console.log("Clicked Survival in slot:", survivalSlot)
      }, 2000)
    } else {
      console.log("Survival not found in menu.")
    }
  })

  bot.on('kicked', console.log)
  bot.on('error', console.log)
  bot.on('end', createBot)
}

createBot()
