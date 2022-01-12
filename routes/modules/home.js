const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/records')
const { errorHandler } = require('../../middleware/errorHandler')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => errorHandler(err, res))
})

router.get('/search', async (req, res) => {
  try {
    const userId = req.user._id
    const category = req.query.category
    const search = (category === '全部類別') ? '' : await Category.findOne({ category }).lean()
    const searchResult = (search === '') ? { userId } : { userId, category: search.category }

    // Record.find(searchResult)
    //   .populate('categoryId')
    //   .lean()
    //   .then(records => res.render('index', { records, category }))
    //   .catch(err => errorHandler(err, res))

    const records = await Record.find(searchResult).populate('categoryId').lean()
    res.render('index', {records, category})
    
  } catch (err) {
    errorHandler(err, res)
  }
})

module.exports = router