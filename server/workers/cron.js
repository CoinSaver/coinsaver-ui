const CronJob = require('cron').CronJob;

module.exports = {
  testCronJob: new CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
      console.log('-----Cron tick!');
    },
    start: false,
  }),
};