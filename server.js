// eslint-disable-next-line no-path-concat
const path = __dirname + '/dist'
const express = require('express')
const app = express()
app.use(express.static(path))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('*', function (req, res) {
  res.sendFile(`${path}/index.html`)
})

const port = 8080
app.listen(port, () => console.log(`Listening on port ${port}`))
