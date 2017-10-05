var dayInterval = require('../')
var day = new Date('2017-01-01T14:30:00')
var range = dayInterval(day)

console.log(range.map(d => d.toString()))

var exclusiveRange = dayInterval(day, { exclusive: true })

console.log(exclusiveRange.map(d => d.toString()))
