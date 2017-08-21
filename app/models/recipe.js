const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: String,
  vidUrl: String,
  servings: String,
  time: String,
  skill: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
