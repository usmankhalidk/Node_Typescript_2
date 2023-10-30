import { getStock } from './stock';
import { getTransactions } from './transactions';

export async function getCurrentStock(sku: string): Promise<{ sku: string, qty: number }> {
  const stockData = await getStock();
  const transactionData = await getTransactions();

  // Logic to calculate current stock based on stockData and transactionData
  // ...

  // Example logic: find the SKU in transactions and calculate the stock level
  const stockLevel = transactionData
    .filter(transaction => transaction.sku === sku)
    .reduce((total, transaction) => {
      if (transaction.type === 'order') {
        total -= transaction.qty;
      } else if (transaction.type === 'refund') {
        total += transaction.qty;
      }
      return total;
    }, stockData.find(item => item.sku === sku)?.stock || 0);

  if (stockLevel < 0) {
    throw new Error(`Invalid stock level for SKU: ${sku}`);
  }

  return { sku, qty: stockLevel };
}


// Example usage
const skuToCheck = 'LTV719449/39/39';
getCurrentStock(skuToCheck)
    .then(stockLevel => console.log(`Current stock level for SKU ${stockLevel.sku}: ${stockLevel.qty}`))
    .catch(error => console.error(error.message));