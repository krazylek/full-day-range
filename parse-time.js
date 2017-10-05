module.exports = parseTime

var multiplier = [60, 60, 1000, 1] // hh, mm, ss, ms

function parseTime(time) {
  if(typeof time != 'string')
    return time

  var values = time.match(/\d+/g)
  return multiplier.reduce(function(total, coef, i) {
    return (total + parseInt(values[i] || 0)) * coef
  }, 0)
}
