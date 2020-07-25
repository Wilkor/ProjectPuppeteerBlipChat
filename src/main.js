const puppeteer = require('puppeteer');
const {flow, config} = require('./config/index');
const path = require('path');

const chatBotWords = flow.flowOne;

try {
  

  (async () => {
    
      const browser = await puppeteer.launch({headless: false });
      const page = await browser.newPage();  
      
      await page.setViewport({ width:800, height:600 });
      await page.goto(config.url)
      await page.waitFor(2000);

       if(config.startButton){
        await page.evaluate(() => document.getElementsByTagName("Button")[0].click());
       }

        for (let x = 0; x < chatBotWords.length; x++) { 

          const total  = (chatBotWords.length - 1);
          
              (() => {

                setTimeout(async () => {

                  await page.type('#msg-textarea', chatBotWords[x], {delay:100});
                  await page.keyboard.press('Enter');
                  await page.screenshot({ path: path.resolve(__dirname, 
                    `screenshot/flow-${chatBotWords[x]
                    .replace(" ","-")
                    .toLowerCase()}.jpg`), fullPage: true })
                    
                    if(x === total){
                      setTimeout(() => {
                        browser.close() 
                      },5000)

                    }

                },x*5000);

                })();


           
        }

    

  })()


} catch (err) {
  if (err.code !== 'EEXIST') throw err

  
}

  