const categoryData = require('./category.json')
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.insertMany(categoryData)
    .then(() => console.log("insert categorySeeder done."))
    .catch(err => errorHandler(err, res))
    .finally(() => process.exit())
})