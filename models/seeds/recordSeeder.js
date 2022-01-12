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

  seed_users.forEach(async (user) => {
    try {
      const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt))
      const createdUser = await User.create({ name: user.name, email: user.email, password: hashPassword })
      const userId = createdUser._id
      records.forEach(item => item.userId = userId)
      await Record.create(records)

      console.log('record done')
      process.exit()

    } catch (err) {
      console.log(err)
    }
  })

  // Promise.all(
  //   Array.from(seed_users, async (user) => {
  //     try {
  //       await bcrypt
  //         .genSalt(10)
  //         .then(salt => bcrypt.hash(user.password, salt))
  //         .then(hash =>
  //           User.create({
  //             name: user.name,
  //             email: user.email,
  //             password: hash,
  //           }))
  //         .then(async createdUser => {
  //           try {
  //             const userId = createdUser._id
  //             records.forEach(item => item.userId = userId)
  //             await Record.create(records)
  //           } catch (err) { console.log(err) }
  //         })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })
  // )
  //   .then(() => {
  //     console.log('record done')
  //     process.exit()
  //   })
  //   .catch(err => console.log(err))
})