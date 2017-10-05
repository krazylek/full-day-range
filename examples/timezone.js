// process.env.TZ = 'Pacific/Noumea' // local timezone used in this example
var tzVancouver = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Vancouver', 
  year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
})

var dayRange = require('../')
var timezoneISODateString = '2017-01-01T14:30:00-08:00'
var day = new Date(timezoneISODateString)


// wrong day range, as JavaScript is not anymore aware of the initial timezone:

var range = dayRange(day)

console.log(range.map(d => d.toString())) 
// => [ 'Mon Jan 02 2017 00:00:00 GMT+1100 (DST)', 'Tue Jan 03 2017 00:00:00 GMT+1100 (DST)' ]



// first option is to pass a timezone option:

var timezoneRange = dayRange(day, { timezone: '-08:00' })

console.log(timezoneRange.map(d => d.toString()))
// => [ 'Sun Jan 01 2017 19:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 19:00:00 GMT+1100 (DST)' ]

// check up:
console.log(timezoneRange.map(tzVancouver.format))
// => [ 'January 1, 2017, 00:00:00', 'January 2, 2017, 00:00:00' ]



// or easier if you have acces to the initial timezoned string:

var easyTzRange = dayRange(timezoneISODateString) 

console.log(easyTzRange.map(d => d.toString()))
// => [ 'Sun Jan 01 2017 19:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 19:00:00 GMT+1100 (DST)' ]



// finally if you simply want the right day, but keep local time range:
var localRange = dayRange(day, { timezone: '-08:00', localTime: true })

console.log(localRange.map(d => d.toString()))
// => [ 'Sun Jan 01 2017 00:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 00:00:00 GMT+1100 (DST)' ]
