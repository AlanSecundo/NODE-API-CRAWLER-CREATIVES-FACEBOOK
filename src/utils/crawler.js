const puppeteer = require("puppeteer");
const axios = require("axios");

async function crawlerAllImagesOfSpecialist(specialist) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const context = await browser.createIncognitoBrowserContext();

  const page = await context.newPage();
  await page.goto(
    "https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR"
  );
  await page.click("._9ff8 ");
  await page.keyboard.type(specialist.facebookName);

  await page.waitForTimeout(2000);

  await page.evaluate(() => {
    document.getElementsByTagName("button")[0].click();
  });

  await page.waitForTimeout(4000);

  const result = await page.evaluate(() => {
    let images = Array.from(document.getElementsByClassName("_7jys"));
    let links = images.map((element) => element.currentSrc);
    return links;
  });

  let formatedArrayOfImages = result.map((el) => ({
    url: el,
    specialist: specialist._id,
  }));

  axios
    .post("http://localhost:3000/creative/save-image-url", {
      images: formatedArrayOfImages,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));

  await browser.close();
}

module.exports = crawlerAllImagesOfSpecialist;
