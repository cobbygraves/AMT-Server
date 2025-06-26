const { TagModel } = require('../models/tags')

const getAllTags = async (req, res) => {
  const tags = await TagModel.find({})
  return res.json(tags)
}

module.exports = {
  getAllTags
}
