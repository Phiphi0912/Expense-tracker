module.exports = {
  dateFormat: (date) => {
    return date.toISOString().slice(0, 10)
  },
  compare: (a, b) => {
    if (a === b) return 'selected'
  }
}