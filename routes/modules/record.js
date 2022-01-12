const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')
const { errorHandler } = require('../../middleware/errorHandler')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/create', async (req, res) => {
  try {
    const body = req.body
    const categoryObj = await Category.findOne({ category: body.category }).lean() //運用非同步處理的地方加上 await
    const userId = req.user._id
    await Record.create({ ...body, categoryId: categoryObj._id, userId })
    res.redirect('/')

  } catch (err) {
    errorHandler(err, res)
  }
})

router.get('/:id', (req, res) => {
  const _id = req.params.id

  Record.findById({ _id })
    .populate('categoryId')
    .lean()
    .then(record => {
      if (!record) return Promise.reject(new Error('no record id: ' + _id))
      res.render('edit', { record })
    })
    .catch(err => errorHandler(err, res))
})

router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const body = req.body
    const categoryObj = await Category.findOne({ category: body.category }).lean()
    const userId = req.user._id

    await Record.findOneAndUpdate({ _id }, { $set: body, categoryId: categoryObj._id, userId })
    res.redirect('/')

  } catch (err) {
    errorHandler(err, res)
  }
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  return Record.findOne({ _id, userId })
    .then(record => {
      if (!record) return Promise.reject(new Error('no record id: ' + _id))
      record.remove()
    })
    .then(() => res.redirect('/'))
    .catch(err => errorHandler(err, res))
})


module.exports = router