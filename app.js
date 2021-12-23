const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes/index')


const app = express()
const port = process.env.PORT || 3000
require('./config/mongoose')

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main", helpers: require('./config/helpers') }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`running on the http://localhost:${port}`)
})