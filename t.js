const IP  = require('./ip'),
      IP4 = IP.IP4,
      IP6 = IP.IP6;

// new IP4()          // TypeError
// new IP4('1.1.1.')  // RangeError
// new IP4('1.1.111') // RangeError
// new IP4('1.1.1.1') // no errr
// new IP4('Ö','1','1',1) // Error
// new IP4('1','1','1',1) // no errr

// new IP6() // TypeError
// new IP6('::ffff:1.1.1.') // RangeError
// new IP6('::ffff:1.1.1.Ö') // Error
// new IP6('::ffff:1.1.1.Ö') // Error
