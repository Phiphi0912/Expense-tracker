const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  const _id = req.params.id

  Record.findById({ _id })
    .populate('categoryId')
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})


module.exports = router