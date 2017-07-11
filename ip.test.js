const IP  = require('./ip'),
      IP4 = IP.IP4,
      IP6 = IP.IP6;

test('', () => {
  console.log(IP);
  const ip4 = new IP4(1, 1, 1, 1)
  console.log(ip4);
  const ip6 = new IP6('2001','0db8','85a3','08d3','1319','8a2e','0370','7344')
  console.log(ip6);
  //expect(getOrElse()).toBe(undefined);
});
