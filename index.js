var timezoneShift = require('shift-timezone-offset')

var defaults = {
  range: [0, 24*60*60*1000],
  localTime: false,
  exclusive: false,
  timezone: null
}

/**
 * Trim a date range to a specific day
 *
 * @param {Date|string} - Date to get range
 * @param {object} options
 *   @prop {Array<int|string>} range - default: [0, 24*60*60*1000]. Day time limits in ms.
 *   @prop {string} timezone - default: local timezone. Parsable timezone, eg. '+05:00', '-1100' or an ISO date: '2017-01-01T12:00:00+05:00'.
 *   @prop {bool} localTime - default: false. Return interval in local time to improve working with time values.
 *   @prop {bool} exclusive - default: false. If true limits day interval to the last mis before end of range, eg. 23:59:59.999.
 * @returns {Array<Date>} - day range
 */

module.exports = function(day, options) {
  options = options || defaults
  var localTime = options.localTime || defaults.localTime
  var timezone = options.timezone || (typeof day == 'string' ? day : null)
  options.range = options.range || defaults.range
  var start = options.range[0] || defaults.range[0]
  var end = options.range[1] || defaults.range[1]

  var converter = timezoneShift(timezone)
  var workDate = converter.toLocal(day)

  var dayStart = floor(workDate, start)
  var dayEnd = floor(workDate, options.exclusive ? end -1 : end) 
  
  return localTime ? [dayStart, dayEnd] :
    [converter.fromLocal(dayStart), converter.fromLocal(dayEnd)]
}


function floor(date, msOffset) {
  var d = new Date(date)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0 + (msOffset || 0))

  return d
}
