var timezoneShift = require('shift-timezone-offset')

var defaults = {
  range: [0, 24 * 60 * 60 * 1000],
  localTime: false,
  exclusive: false,
  timezone: null
}

module.exports = dayRange

function dayRange (day, options) {
  options = options || defaults
  var localTime = options.localTime || defaults.localTime
  var timezone = options.timezone || (typeof day === 'string' ? day : null)
  options.range = options.range || defaults.range
  var start = options.range[0] || defaults.range[0]
  var end = options.range[1] || defaults.range[1]

  var converter = timezoneShift(timezone)
  var workDate = converter.toLocal(day)

  var dayStart = floor(workDate, start)
  var dayEnd = floor(workDate, options.exclusive ? end - 1 : end)

  return localTime ? [dayStart, dayEnd]
    : [converter.fromLocal(dayStart), converter.fromLocal(dayEnd)]
}

function floor (date, msOffset) {
  var d = new Date(date)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0 + (msOffset || 0))

  return d
}
