const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')

router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

module.exports = router