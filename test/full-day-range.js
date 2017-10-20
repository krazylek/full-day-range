var dayInterval = require('../')
var parseTime = require('parse-time-to-ms')
var test = require('tape')

test('valid local day range', function (t) {
  var day = new Date(2017, 0, 1, 12)
  var expectedStart = new Date('2017-01-01T00:00:00')
  var expectedEnd = new Date('2017-01-02T00:00:00')

  t.deepEqual(dayInterval(day), [expectedStart, expectedEnd])
  t.end()
})

test('day could be a timestamp', function (t) {
  var day = new Date(2017, 0, 1, 12).getTime()
  var expectedStart = new Date('2017-01-01T00:00:00')
  var expectedEnd = new Date('2017-01-02T00:00:00')

  t.deepEqual(dayInterval(day), [expectedStart, expectedEnd])
  t.end()
})

test('alt timezone day range', function (t) {
  var timezoneISODateString = '2017-01-01T12:00:00+05:00'
  var day = new Date(timezoneISODateString)
  var expectedStart = new Date('2017-01-01T00:00:00+05:00')
  var expectedEnd = new Date('2017-01-02T00:00:00+05:00')

  t.deepEqual(dayInterval(day, { timezone: '+05:00' }), [expectedStart, expectedEnd], 'from a js Date')
  t.deepEqual(dayInterval(timezoneISODateString), [expectedStart, expectedEnd], 'from a timezoned ISO date string')
  t.end()
})

test('alt timezone day range to local time', function (t) {
  var timezoneISODateString = '2017-01-01T12:00:00+05:00'
  var day = new Date(timezoneISODateString)
  var expectedStart = new Date('2017-01-01T00:00:00')
  var expectedEnd = new Date('2017-01-02T00:00:00')

  t.deepEqual(dayInterval(day, { timezone: '+05:00', localTime: true }), [expectedStart, expectedEnd], 'from a js Date')
  t.deepEqual(dayInterval(timezoneISODateString, { localTime: true }), [expectedStart, expectedEnd], 'from a timezoned ISO date string')
  t.end()
})

test('custom day range in local time', function (t) {
  var day = new Date('2017-01-01T14:30:00')
  var timeRange = [parseTime('18:00'), parseTime('23:30')]
  var expectedStart = new Date('2017-01-01T18:00:00')
  var expectedEnd = new Date('2017-01-01T23:30:00')

  t.deepEqual(dayInterval(day, { range: timeRange }), [expectedStart, expectedEnd])
  t.end()
})

test('custom end time only', function (t) {
  var day = new Date('2017-01-01T14:30:00')
  var timeRange = [null, parseTime('23:30')]
  var expectedStart = new Date('2017-01-01T00:00:00')
  var expectedEnd = new Date('2017-01-01T23:30:00')

  t.deepEqual(dayInterval(day, { range: timeRange }), [expectedStart, expectedEnd])
  t.end()
})

test('custom start time only', function (t) {
  var day = new Date('2017-01-01T14:30:00')
  var timeRange = [parseTime('18:00')]
  var expectedStart = new Date('2017-01-01T18:00:00')
  var expectedEnd = new Date('2017-01-02T00:00:00')

  t.deepEqual(dayInterval(day, { range: timeRange }), [expectedStart, expectedEnd])
  t.end()
})

test('custom day range in alt timezone time', function (t) {
  var timezoneISODateString = '2017-01-01T12:00:00+08:00'
  var day = new Date(timezoneISODateString)
  var timeRange = [parseTime('18:00'), parseTime('23:30')]
  var expectedStart = new Date('2017-01-01T18:00:00+08:00')
  var expectedEnd = new Date('2017-01-01T23:30:00+08:00')

  t.deepEqual(dayInterval(day, { timezone: '+08:00', range: timeRange }), [expectedStart, expectedEnd])
  t.deepEqual(dayInterval(timezoneISODateString, { range: timeRange }), [expectedStart, expectedEnd])
  t.end()
})

test('all together: custom day range converted to local', function (t) {
  var timezoneISODateString = '2017-01-01T17:00:00-08:00'
  var day = new Date(timezoneISODateString)
  var timeRange = [parseTime('18:00'), parseTime('23:30')]
  var expectedStartTz = new Date('2017-01-01T18:00:00-08:00')
  var expectedEndTz = new Date('2017-01-01T23:30:00-08:00')
  var expectedStartLocal = new Date('2017-01-01T18:00:00')
  var expectedEndLocal = new Date('2017-01-01T23:30:00')

  t.deepEqual(dayInterval(day, { timezone: '-08:00', range: timeRange }), [expectedStartTz, expectedEndTz])
  t.deepEqual(dayInterval(timezoneISODateString, { range: timeRange }), [expectedStartTz, expectedEndTz])
  t.deepEqual(dayInterval(day, { timezone: '-08:00', range: timeRange, localTime: true }), [expectedStartLocal, expectedEndLocal])
  t.deepEqual(dayInterval(timezoneISODateString, { range: timeRange, localTime: true }), [expectedStartLocal, expectedEndLocal])
  t.end()
})
