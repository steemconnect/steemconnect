// eslint-disable-next-line import/prefer-default-export
export function groupByRealPrice(orders, digits = 6) {
  return orders.reduce((a, b) => {
    const val = parseFloat(b.real_price).toFixed(digits);

    const sbd = a[val] ? a[val].sbd : 0;
    const steem = a[val] ? a[val].steem : 0;
    const count = a[val] ? a[val].count : 0;

    return {
      ...a,
      [val]: {
        price: val,
        sbd: sbd + b.sbd,
        steem: steem + b.steem,
        count: count + 1,
      },
    };
  }, {});
}
