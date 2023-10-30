import { getCurrentStock } from '../src/index';

test('Get current stock for a valid SKU', async () => {
  const result = await getCurrentStock('LTV719449/39/39');
  expect(result).toEqual({ sku: 'LTV719449/39/39', qty: 8510 }); // Update qty based on your logic
});
