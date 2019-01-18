module.exports = (error, req, res, next) => {
  // console.log(error)
  res.status(error.status || 500).json({ message: error.message })
}
