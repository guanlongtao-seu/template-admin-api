const schedule = require('node-schedule');
const {postCrawler} = require('./crawler');
async function run() {
  console.log('开始配置schedule任务');
  schedule.scheduleJob('1 * * * * *', postCrawler);
}

run();
