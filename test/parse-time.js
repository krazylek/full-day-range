var parseTime = require('../parse-time')
var test = require('tape')

var baseTime = new Date(2017,0,1,0,0,0,0)
test('complete time', function (t) {
  var time = '23:30:10.001'
  var parsedTime = parseTime(time)
  var expectedMs = new Date(2017, 0, 1, 23, 30,10,1) - baseTime

  t.equal(parsedTime, expectedMs)
  t.end()
})


test('hh:mm format', function (t) {
  var time = '23:05'
  var parsedTime = parseTime(time)
  var expectedMs = new Date(2017, 0, 1, 23, 5,0,0) - baseTime

  t.equal(parsedTime, expectedMs)
  t.end()
})

test('whole day', function (t) {
  var time = '24:00'
  var parsedTime = parseTime(time)
  var expectedMs = new Date(2017, 0, 2, 0, 0,0,0) - baseTime

  t.equal(parsedTime, expectedMs)
  t.end()
})

