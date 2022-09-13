const currentStock = require('./stock_check');

test('It should return { sku: LTV719449/39/39, qty: 8510}', () => {
    return currentStock('LTV719449/39/39').then(data => {
      expect(data).toEqual({ sku: 'LTV719449/39/39', qty: 8510});
    });
});

test('It should return error', () => {
    return currentStock('LTV719').catch(error => {
      expect(error).toBe('SKU does not exist in stock and transaction.');
    });
});