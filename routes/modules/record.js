const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/create', async (req, res) => {
  const body = req.body
  const categoryId = await Category.findOne({ category: body.category }).lean()
  // const userId = req.user._id
  Record.create({ ...body, categoryId: categoryId._id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id

  Record.findById({ _id })
    .populate('categoryId')
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.log(err))
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const body = req.body
  const categoryId = await Category.findOne({ category: body.category }).lean()
  // const userId = req.user._id
  if (!body) return

  return Record.findOneAndUpdate({ _id }, { $set: body, categoryId: categoryId._id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const body = req.body
  // const userId = req.user._id
  if (!_id) return

  return Record.findOne({ _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router