const db = require('../../config/mongoose')
const User = require('../users')
const Category = require('../category')
const records = require('./records.json')
const Record = require('../records')

const seed_users = [
  { name: "user1", email: "user1@example.com", password: "12345678", Index: [0, 1, 2] },
  { name: "user2", email: "user2@example.com", password: "12345678", Index: [3, 4] },
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

  Promise.all(
    Array.from(seed_users, user => {
      return User.create({
        name: user.name,
        email: user.email,
        password: user.password,
      })
        .then(createdUser => {
          const userId = createdUser._id
          const array = []
          user.Index.forEach(index => {
            records[index].userId = userId
            array.push(records[index])
          })
          return Record.create(array)
        })
    })
  )
    .then(() => {
      console.log('record done')
      process.exit()
    })
})