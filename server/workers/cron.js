const CronJob = require('cron').CronJob;

module.exports = {

  testCronJob: new CronJob({
    cronTime: '* * * * * *',
    onTick: () => {
      console.log('-----Cron tick!');
    },
    start: false,
  }),

  dailyTransactionUpdate: new CronJob({
    cronTime: '00 00 08 * * 0-6',
    onTick: () => {

    },
    start: false,
    timeZone: 'America/Los_Angeles',
  }),
};
