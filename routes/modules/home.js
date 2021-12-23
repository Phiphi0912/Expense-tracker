const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

module.exports = router