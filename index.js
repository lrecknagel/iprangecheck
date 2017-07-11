'use strict';

const checker = module.exports;

checker.checkIP(ip, ips = [], iprs = []) {
  // check if single ips includes ip
  if ( ips.includes(ip) ) return true
  if (iprs.some(ipr => {
    const _range = ipr.split('-')
    const _rangeLowerBound = _range[0].split('.').map(e => Number(e))
    const _rangeUpperBound = _range[1].split('.').map(e => Number(e))

    const _originIp4Arr = ip.split('.').map(e => Number(e))

    return false
  }))
}


function(origin_ip, allowed_ips = []) {
  if (allowed_ips.length > 0) {
    const ips = allowed_ips.filter(e => !e.includes('-'))
    const iprs = allowed_ips.filter(e => e.includes('-'))
    // check if any single ip matches the incoming req ip
    if ( ips.includes(origin_ip)) {
      return {success: true, ips: allowed_ips}
    } else {
      const _rangeResults = []
      for (let i = 0; i < iprs.length; i++) {

        const _range = iprs[i].split('-')
        const _noip = origin_ip.split('.').map(e => Number(e))

        const _rangeLowerBound = _range[0].split('.').map(e => Number(e))
        const _rangeUpperBound = _range[1].split('.').map(e => Number(e))

        for (let k0 = 0; k0 < _rangeLowerBound.length; k0++) {
          if (_noip[k0] < _rangeLowerBound[k0]) {
            _rangeResults.push(false)
          }
        }

        for (let k1 = 0; k1 < _rangeUpperBound.length; k1++) {
          if (_noip[k1] > _rangeUpperBound[k1]) {
            _rangeResults.push(false)
          }
        }

        _rangeResults.push(true)

      }
      if (_rangeResults.some(e => e === true)) {
        return {success: true, ips: allowed_ips}
      } else {
        return {success: false, ips: allowed_ips, message: 'You have no access with your current IP'}
      }
    }
  } else {
    return {success: true, ips: []}
  }
}
