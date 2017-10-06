# full-day-range

Given a date, provide a full day range, or custom subset. Timezone aware.

# example

``` js
var dayRange = require('../')
var day = new Date('2017-01-01T14:30:00')
var range = dayRange(day)

console.log(range.map(d => d.toString()))

// => [ 'Sun Jan 01 2017 00:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 00:00:00 GMT+1100 (DST)' ]


var exclusiveRange = dayRange(day, { exclusive: true })

console.log(exclusiveRange.map(d => d.toString()))

// => [ 'Sun Jan 01 2017 00:00:00 GMT+1100 (DST)', 'Sun Jan 01 2017 23:59:59 GMT+1100 (DST)' ]
```


# timezones

When working in other timezone, you would probably want the day range in original timezone. But internaly, JavaScript is not anymore aware of the timezone, which lead to unexpected results.

To work in other timezone, just pass the `timezone` option. It could be a valid ISO string or an numerical offset (in minutes).


``` js
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
```

Unfortunately, sometimes you could want to work with other timezone, which could to lead to unexpected behaviors.


# custom day range

Default range is `00:00` current day to `00:00 day +1`(full day interval). If you prefer a custom range while, a range option is available. And it's still getting the timezone alright.

The range could be set with an array of milliseconds (from `00:00` current day). Default is `[0, 24*60*60*1000]`.

To allow more convenience, a tiny parser is provided: `var parseTime = require('full-day-range/parse-time')`.

```
var dayInterval = require('../')
var parseTime = require('../parse-time')

var day = new Date('2017-01-01T14:30:00')
var timeRange = [parseTime('18:00'), parseTime('23:30')]
var dayCustomRange = dayInterval(day, { range: timeRange })

console.log(dayCustomRange.map(d => d.toString()))

// [ 'Sun Jan 01 2017 18:00:00 GMT+1100 (DST)', 'Sun Jan 01 2017 23:30:00 GMT+1100 (DST)' ]
```



# api

```js
var dayRange = require('full-day-range')
```

## `var range = dayRange(dayDate, [opts])`

Return an array of two dates, starting at `dayDate 00:00:00.000` to `dayDate +1 00:00:00.000`.

* `dayDate` - any valid value for the `Date` constructor. This is the base date for the range.
* `optse` - the date range to be trimmed to fit inside the provided day. Hqave to be ordered: `[startDate, endDate]`.
* `opts.timezone` - Valid ISO 8601 date string or timezone string. Change the timezone to work with. 
* `opts.range` - Default is `[0, 24*60*60*1000]`. Array of milliseconds to offset the range: `[startMs, endMs]`.
* `opts.exclusive` - default `false`. If you want to exclude the last millisecond, so the day range is from current day `00:00:00.000` to `23:59:59.999`.
* `opts.localTime` - default `false`. If you want to convert the range to local timezone.

---

`var parseTime = require('full-day-range/parse-time')`

## `parseTime(timeString)`

10 lines module to convert a time string into milliseconds.

* `timeString` - a valid time string, have to start with hours (eg. '35:10' would be interpreted as 35 hours 10 minutes). Some valid formats: `'02:35'`, `'02:35:55'` or `'2:35:55.010'`.



# license

MIT


# install

```
npm install full-day-range
```
