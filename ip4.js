const _IP4 = require('ip-address').Address4;

class IP4 {
  constructor(ipString, isSubnet = false) {

    if (ipString.match(/\//gi)) {
      throw new Error(`Given IP string: ${ ipString } should not contain subnet information.`);
    }

    const subnet = isSubnet
      ? 32 - (ipString.split('.').filter(oct => oct === 0 || oct === '0').length * 8)
      : 32;

    this.IP_I = new _IP4(`${ ipString }/${ subnet }`);
    this.address = this.IP_I.addressMinusSuffix;
    this.subnet = this.IP_I.parsedSubnet;

    if (!this.IP_I.isValid()) {
      throw new Error(`Given IP string: ${ ipString } is not a valid IP4 address.`)
    }

    // console.log(`IP ${ this.IP } START: ${ this.IP.startAddress().address }`);
    // console.log(`IP ${ this.IP } END: ${ this.IP.endAddress().address }`);
  }

  isInSubnet(ip) {
    return this.IP_I.isInSubnet(ip.IP_I);
  }
}

module.exports = IP4;