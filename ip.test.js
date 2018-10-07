const { IP4 } = require('./index');

test('IP4 | VALID IP4 should construct a valid IP4 instance', () => {
  const IP_4 = new IP4('192.168.178.10');
  expect(IP_4.address).toBe('192.168.178.10');
  expect(IP_4.subnet).toBe('32');
});

test('IP4 | INVALID IP4 should throw invalid IP4 error', () => {
  expect(() => new IP4('192.168.178.A')).toThrow();
});

test('IP4 | IP4 with subnetinfo (eg.: /32) should throw no subnet information error', () => {
  expect(() => new IP4('192.168.178.10/32')).toThrow();
});

test('IP4 | MATCH ON OCT 1 - 3 with IP EQUAL ON OCT 1 -3 MUST MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('192.168.178.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(true);
});

test('IP4 | MATCH ON OCT 1 - 3 with IP NON EQUAL ON OCT 1 - 3 SHOULD NOT MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('192.168.179.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(false);
});

test('IP4 | MATCH ON OCT 1 - 2 with IP EQUAL ON OCT 1 - 2 MUST MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('192.168.0.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(true);
});

test('IP4 | MATCH ON OCT 1 - 2 with IP NON EQUAL ON OCT 1 - 2 SHOULD NOT MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('192.169.0.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(false);
});

test('IP4 | MATCH ON OCT 1 with IP EQUAL ON OCT 1 MUST MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('192.0.0.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(true);
});

test('IP4 | MATCH ON OCT 1 with IP NON EQUAL ON OCT 1 SHOULD NOT MATCH', () => {
  const STATIC_IP_4 = new IP4('192.168.178.21');
  const IP_4_SUBNET_TO_TEST = new IP4('193.0.0.0', true);
  expect(STATIC_IP_4.isInSubnet(IP_4_SUBNET_TO_TEST)).toBe(false);
});