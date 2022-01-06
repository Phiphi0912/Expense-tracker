const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/create', async (req, res) => {
  const body = req.body
  const categoryObj = await Category.findOne({ category: body.category }).lean() //運用非同步處理的地方加上 await
  const userId = req.user._id
  Record.create({ ...body, categoryId: categoryObj._id, userId })
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
  const categoryObj = await Category.findOne({ category: body.category }).lean()
  const userId = req.user._id
  if (!body) return

  return Record.findOneAndUpdate({ _id }, { $set: body, categoryId: categoryObj._id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  if (!_id) return

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router