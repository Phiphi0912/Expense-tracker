if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const User = require('../users')
const Category = require('../category')
const records = require('./records.json')
const Record = require('../records')
const bcrypt = require('bcryptjs')
const { errorHandler } = require('../../middleware/errorHandler')

const seed_users = [
  { name: "user1", email: "user1@example.com", password: "12345678" },
  { name: "user2", email: "user2@example.com", password: "12345678" },
]

db.once('open', () => {

  records.forEach(record => {
    const category = record.category
    Category.find({ category })
      .lean()
      .then(item => {
        const categoryId = item[0]._id
        record.categoryId = categoryId
      })
  })

  Promise.all(seed_users.map(async (user) => {
    try {
      const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt))
      const createdUser = await User.create({ name: user.name, email: user.email, password: hashPassword })
      const userId = createdUser._id
      records.forEach(item => item.userId = userId)
      await Record.create(records)

      console.log('record done')
    } catch (err) {
      console.log(err)
    }
  }))
    .finally(() => process.exit())
})