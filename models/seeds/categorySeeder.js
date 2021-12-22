const categoryData = require('./category.json')
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.insertMany(categoryData)
    .then(() => console.log("insert categorySeeder done."))
    .then(() => process.exit())
})