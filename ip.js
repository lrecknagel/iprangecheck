function isHex(h) {
  const a = parseInt(h, 16);
  return a.toString(16) === h.toLowerCase()
}
const ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
const ipv6Regex = /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;
function isIP4(ip) {
  return ipv4Regex.test(ip);
}
function isIP6(ip) {
  return ipv6Regex.test(ip);
}
function dec2hex(d, padding = 2) {
  let hex = Number(d).toString(16);
  while (hex.length < padding) {
    hex = "0" + hex;
  }
  return hex;
}
function ip42ip6(ip4) {
  const IP4 = ip4.split('.').map(s => Number(s))
  const A = dec2hex(IP4[0]) //.toString(16);
  const B = dec2hex(IP4[1]) //.toString(16);
  const C = dec2hex(IP4[2]) //.toString(16);
  const D = dec2hex(IP4[3]) //.toString(16);
  return [`${A}${B}`, `${C}${D}`]
}

class IP4 {
  constructor() {
    const _arguments = Array.from(arguments)

    if (_arguments.length === 0) {
      throw new TypeError('Cannot create a IP4 without any arguments.')
    } else if (_arguments.length === 1 && typeof(_arguments[0]) === 'string') {
      // try to create ip4 from string
      // check min length (0.0.0.0) => 7
      const _possibleIPString = _arguments[0]
      if (_possibleIPString.length < 7) {
        throw new RangeError('The provided IP String does not matches the min length of 7 chars.')
      }
      const _possibleIPOctets = _possibleIPString.split('.')
      if (_possibleIPOctets.length < 4) {
        throw new RangeError('The provided IP String does not matches the standard IP4 pattern.')
      }
      if (_possibleIPOctets.some( oct => Number.isNaN(Number(oct))) ) {
        throw new TypeError('Cannot create a IP4 from a char that cannot be a number.')
      }
      this.oct1 = Number(_possibleIPOctets[0])
      this.oct2 = Number(_possibleIPOctets[1])
      this.oct3 = Number(_possibleIPOctets[2])
      this.oct4 = Number(_possibleIPOctets[3])
      this.ip   = `${this.oct1}.${this.oct2}.${this.oct3}.${this.oct4}`
      console.log(isIP4(this.ip));
    } else if (
      _arguments.length === 4 &&
      _arguments.every( arg => (typeof(arg) === 'number' || typeof(arg) === 'string') && !Number.isNaN(Number(arg))) &&
      _arguments.every( arg => 0 <= Number(arg) <= 255)
    ) {
      // try to create ip4 from 4 input numbers / strings
      this.oct1 = Number(_arguments[0])
      this.oct2 = Number(_arguments[1])
      this.oct3 = Number(_arguments[2])
      this.oct4 = Number(_arguments[3])
      this.ip   = `${this.oct1}.${this.oct2}.${this.oct3}.${this.oct4}`
      console.log(isIP4(this.ip));
    } else {
      throw new Error('Cannot convert input to IP4.')
    }
  }
}

class IP6 {
  constructor() {
    const _arguments = Array.from(arguments)

    if (_arguments.length === 0) {
      throw new TypeError('Cannot create a IP6 without any arguments.')
    } else if (_arguments.length === 1 && typeof(_arguments[0]) === 'string') {
      // try to create ip6 from string
      // check min length ::ffff:192.168.0.1 => 14
      const _possibleIPString = _arguments[0]
      if (_possibleIPString.length < 14) {
        throw new RangeError('The provided IP String does not matches the min length of 14 chars.')
      }
      // check for special IP4 converted to ip6 version
      const _ipFragments = _possibleIPString.split(':')
      if (isIP4(_ipFragments[3])) {
        const convertedIP4 = ip42ip6(_ipFragments[3])
        this.b1 = ''
        this.b2 = ''
        this.b3 = ''
        this.b4 = ''
        this.b5 = '::'
        this.b6 = 'ffff'
        this.b7 = String(convertedIP4[0])
        this.b8 = String(convertedIP4[1])
        this.ip = `${this.b1}:${this.b2}:${this.b3}:${this.b4}:${this.b5}:${this.b6}:${this.b7}:${this.b8}`
        console.log(isIP6(this.ip));
      }

      const _possibleIPOctets = _possibleIPString.split(':')
      if (_possibleIPOctets.length < 8 && _possibleIPOctets.every( oct => isHex(oct)) ) {
        throw new RangeError('The provided IP String does not matches the standard IP6 pattern.')
      }
      if (!isIP4(_ipFragments[3]) && !_ipFragments[3].includes('.')) {
        this.b1 = String(_arguments[0])
        this.b2 = String(_arguments[1])
        this.b3 = String(_arguments[2])
        this.b4 = String(_arguments[3])
        this.b5 = String(_arguments[4])
        this.b6 = String(_arguments[5])
        this.b7 = String(_arguments[6])
        this.b8 = String(_arguments[7])
        this.ip = `${this.b1}:${this.b2}:${this.b3}:${this.b4}:${this.b5}:${this.b6}:${this.b7}:${this.b8}`
        console.log(isIP6(this.ip));
      } else {
        throw new Error('Cannot convert input to IP6.')
      }
    } else if ( _arguments.length === 8 && _arguments.every( arg => isHex(arg)) ) {
      // try to create ip6 from 8 input hex-strings
      this.b1 = String(_arguments[0])
      this.b2 = String(_arguments[1])
      this.b3 = String(_arguments[2])
      this.b4 = String(_arguments[3])
      this.b5 = String(_arguments[4])
      this.b6 = String(_arguments[5])
      this.b7 = String(_arguments[6])
      this.b8 = String(_arguments[7])
      this.ip = `${this.b1}:${this.b2}:${this.b3}:${this.b4}:${this.b5}:${this.b6}:${this.b7}:${this.b8}`
      console.log(isIP6(this.ip));
    } else {
      throw new Error('Cannot convert input to IP6.')
    }
  }
}

module.exports = {
  IP4,
  IP6
}
