# full-day-range

Given a date, provide a full day range, or custom subset. Timezone aware.

# example

``` js
var dayRange = require('full-day-range')
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

var dayRange = require('full-day-range')
var tzVancouver = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Vancouver', 
  year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
})
var timezoneISODateString = '2017-01-01T14:30:00-08:00'
var day = new Date(timezoneISODateString)


// wrong day range, as JavaScript is not anymore aware of the initial Vancouver '-08:00' timezone:
var range = dayRange(day)

console.log(range.map(d => d.toString())) 
// => [ 'Mon Jan 02 2017 00:00:00 GMT+1100 (DST)', 'Tue Jan 03 2017 00:00:00 GMT+1100 (DST)' ]



// first option is to pass a timezone option:
var timezoneRange = dayRange(day, { timezone: '-08:00' })

console.log(timezoneRange.map(d => d.toString()))
// => [ 'Sun Jan 01 2017 19:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 19:00:00 GMT+1100 (DST)' ]

// verify the previous result with local date formatting:
console.log(timezoneRange.map(tzVancouver.format))
// => [ 'January 1, 2017, 00:00:00', 'January 2, 2017, 00:00:00' ]



// or easier if you have acces to the initial timezoned string:
var easyTzRange = dayRange(timezoneISODateString) 

console.log(easyTzRange.map(tzVancouver.format))
// => [ 'January 1, 2017, 00:00:00', 'January 2, 2017, 00:00:00' ]



// finally if you simply want the right day, but keep local time range:
var localRange = dayRange(day, { timezone: '-08:00', localTime: true })

console.log(localRange.map(d => d.toString()))
// => [ 'Sun Jan 01 2017 00:00:00 GMT+1100 (DST)', 'Mon Jan 02 2017 00:00:00 GMT+1100 (DST)' ]
```


# custom day range

Default range is `00:00` current day to `00:00 day +1`(full day interval). If you prefer a custom range while, a range option is available. And it's still getting the timezone alright.

The range is be set with an array of milliseconds (from `00:00` current day). Default is `[0, 24*60*60*1000]`.

To allow more convenience, the tiny `parse-time-to-ms` module could be use.

```
var dayRange = require('full-day-range')
var parseTime = require('parse-time-to-ms')

var day = new Date('2017-01-01T14:30:00')
var timeRange = parseTime.s('18:00', '23:30')
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

### `dayDate`

Any valid value for the `Date` constructor. This is the base date for the range.

### `opts` 

* `opts.range` - Default is `[0, 24*60*60*1000]`. Array of milliseconds to offset the range: `[startMs, endMs]`. 
  If `endMs` < `startMs`, it will be considered as next day.
* `opts.exclusive` - default `false`. Exclude the last millisecond, so the day range is current day from `00:00:00.000` to `23:59:59.999`.
* `opts.timezone` - Valid ISO 8601 date string or timezone string. Change the timezone to work with. 
* `opts.localTime` - default `false`. Convert the range to local timezone (only usefull with `opts.timezone` specified). 


# license

MIT


# install

```
npm install full-day-range
```


# see also

- https://github.com/krazylek/parse-time-to-ms Parse ISO time string to milliseconds.
- https://github.com/unshiftio/millisecond Parse natural language to milliseconds.

