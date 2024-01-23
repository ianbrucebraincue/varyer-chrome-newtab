import puppeteer from 'puppeteer';

const url = "https://www.varyer.com/";

const main = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const articleLinks = await page.evaluate(() => {
        const articles = document.getElementsByClassName('article-link');

        return Array.from(articles).slice(0, 3).map((article) => {
            const url = article.querySelector('a');
            const urlLink = url.href;
            const urlChild = url.getElementsByClassName('text')[0];
            const title = urlChild.getElementsByClassName('article-title')[0].innerText;

            return { title, urlLink }
        });
    });

    console.log(articleLinks);
}

main();