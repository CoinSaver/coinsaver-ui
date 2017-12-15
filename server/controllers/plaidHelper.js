const plaid = require('plaid');
const moment = require('moment');

module.exports = {
  formatTransactions: function formatTransactions(transactionsResponse) {
    const resArray = [];
    const indexTrack = {};

    // Formats an object for only checking accounts and pushes to resArray
    for (let i = 0; i < transactionsResponse.accounts.length; i++) {
      if (transactionsResponse.accounts[i].subtype === 'checking') {
        const accObj = {
          id: transactionsResponse.accounts[i].account_id,
          name: transactionsResponse.accounts[i].name,
          type: transactionsResponse.accounts[i].subtype,
          transactions: [],
          roundSum: 0,
          totalSum: 0,
        };

        resArray.push(accObj);

        // indexTrack just keeps track of which index in resArray array
        // stores which account_id's information for quicker lookup
        indexTrack[accObj.id] = resArray.length - 1;
      }
    }

    // Sorts transaction items into the appropriate object in resArray
    for (let i = 0; i < transactionsResponse.transactions.length; i++) {
      const temp = transactionsResponse.transactions[i];

      // If current transaction is for an account in our indexTrack
      // it means this transactions is for a valid account
      if (indexTrack[temp.account_id] !== undefined) {
        const transactionObj = {
          amount: temp.amount,
          round: Math.ceil(temp.amount) - temp.amount,
          date: temp.date,
          location: {
            city: temp.location.city,
          },
          name: temp.name,
        };
        resArray[indexTrack[temp.account_id]].transactions.push(transactionObj);
        resArray[indexTrack[temp.account_id]].totalSum += transactionObj.amount;
        if (transactionObj.amount > 0) {
          resArray[indexTrack[temp.account_id]].roundSum += transactionObj.round;
        }
      }
    }

    return resArray;
  },
};
