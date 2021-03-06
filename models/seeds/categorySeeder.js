const categoryData = require('./category.json')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.insertMany(categoryData)
    .then(() => console.log("insert categorySeeder done."))
    .then(() => console.log(err))
    .finally(() => process.exit())
})