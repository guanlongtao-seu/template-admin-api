const https = require('https');
const cheerio = require('cheerio');

exports.postCrawler = async () => {
  const url = 'https://coinspeaker.com/news/business/';

  https.get(url, function (res) {
    let html = '';
    res.on('data', function (chunk) {
      html += chunk;
    });
    res.on('end', function () {
      console.log(html);
      const $ = cheerio.load(html);
      $("body div.app").each(function () {
        console.log($(this).html());
      })
    })
  });
};

