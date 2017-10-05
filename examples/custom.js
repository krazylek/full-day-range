var dayInterval = require('../')
var parseTime = require('../parse-time')

var day = new Date('2017-01-01T14:30:00')
var timeRange = [parseTime('18:00'), parseTime('23:30')]
var dayCustomRange = dayInterval(day, { range: timeRange })

console.log(dayCustomRange.map(d => d.toString()))
