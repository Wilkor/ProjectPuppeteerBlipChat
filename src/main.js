const puppeteer = require('puppeteer');
const {flow, config} = require('./config/index');
const path = require('path');

const chatBotWords = flow.flowOne;

try {
  

  (async () => {
    
      const browser = await puppeteer.launch({headless: false, args: ['--start-maximized'] });
      const page = await browser.newPage();
        await page.setViewport({
          width: 1920,
          height: 1080
      })
      
      await page.goto(config.url)

        for (let x = 0; x < chatBotWords.length; x++) { 
          
              (() => {

                setTimeout(async () => {

                  await page.type('#msg-textarea', chatBotWords[x], {delay:100});
                  await page.keyboard.press('Enter');
                  await page.screenshot({ path: path.resolve(__dirname, `screenshot/flow-${chatBotWords[x]}.jpg`), fullPage: true })

                },x*5000);

                })();
          
        }

    //browser.close()

  })()


} catch (err) {
  if (err.code !== 'EEXIST') throw err

  
}

  