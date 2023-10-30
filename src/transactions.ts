import * as fs from 'fs';

export async function getTransactions(): Promise<any[]> {
  const rawData = fs.readFileSync('transactions.json');
  return JSON.parse(rawData.toString());
}
