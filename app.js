const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes/index')


const app = express()
const port = process.env.PORT || 3000
require('./config/mongoose')

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(routes)

app.listen(port, () => {
  console.log(`running on the http://localhost:${port}`)
})