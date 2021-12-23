module.exports = {
  dateFormat: (date) => {
    return date.toISOString().slice(0, 10)
  },
  compare: (a, b) => {
    if (a === b) return 'selected'
  },
  totalAmount: (records) => {
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
    })
    return totalAmount
  }
}