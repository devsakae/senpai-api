const checkType = (req) => {
  if (req.body.entry[0].changes[0].value.statuses) return true
  return false
}

module.exports = {
  checkType,
}