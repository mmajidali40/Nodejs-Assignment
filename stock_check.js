const fs = require('fs');

function currentStock(sku) {
  return new Promise( (resolve, reject) => {
    fs.readFile('./Node Typescript/stock.json', 'utf8', (err, stocks) => {
      if (err) {
        console.error(err);
        return reject('error in reading stock file.');
      }
      let jsonStocks = JSON.parse(stocks);
      fs.readFile('./Node Typescript/transactions.json', 'utf8', (err, transactions) => {
        if (err) {
          console.error(err);
          return reject('error in reading transaction file.');
        }
        let jsonTransactions = JSON.parse(transactions);
        let stock = 0;
        let isAvailableStock = jsonStocks.find(stock  => stock.sku == sku);
        if(isAvailableStock != undefined) {
          stock = isAvailableStock.stock;
        } 
        let skuTransactions = jsonTransactions.filter(el => el.sku == sku);
        if(isAvailableStock == undefined && skuTransactions.length == 0) {
          return reject('SKU does not exist in stock and transaction.');
        }

        let order = 0;
        let refund = 0;
    
        skuTransactions.forEach(transaction => {
            if(transaction.type == 'order') {
              order += transaction.qty ;
            } if(transaction.type == 'refund') {
              refund += transaction.qty ;
            } 
        });
        
        let availableStock = (stock + refund) - order;
        console.log(`available stock: ${availableStock}`);  
        resolve({ sku: sku, qty: availableStock });
      });
    }) 
  });
}

module.exports = currentStock;