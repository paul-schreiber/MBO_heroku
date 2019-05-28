const express = require('express')
const app = express()
let lastValue

app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
  if (req.query.command === '') {
    res.send('{ "command":"' + lastValue + '"}')
  } else {
    if (req.query.command === 'empty') {
      lastValue = ''
      res.send('{}')
    } else if (req.query.command === 'restart-restart') {
      lastValue = 'restart'
      res.send('{restart}')
    } else {
      res.send('{ "command":"' + req.query.command + '"}')
      lastValue = req.query.command
    }
  }
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port\', app.get(\'port\')')
})