import * as fs from 'fs';

export async function getStock(): Promise<any[]> {
  const rawData = fs.readFileSync('stock.json');
  return JSON.parse(rawData.toString());
}
