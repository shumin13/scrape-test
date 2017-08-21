const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const router = express.Router()
const mongoose = require('mongoose')
var Recipe = mongoose.model('Recipe')
  // Article = mongoose.model('Article')

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', function (req, res, next) {
  let url = 'http://themeatmen.sg/sg-bbq-chicken-wings/'

  request(url, function (err, response, body){
    if (err) return next(err)

    const $ = cheerio.load(body)
    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')
    let servings = $('.recipe-header').find('li').first().text()
    let time = $('.recipe-header').find('li:nth-child(2)').text()
    let skill = $('.recipe-header').find('li').last().text()

    var newRecipe = new Recipe({
      title: title,
      vidUrl: vidUrl,
      servings: servings,
      time: time,
      skill: skill
    })

    newRecipe.save(function(err, createdRecipe) {
      if (err) return res.send(err)
      res.send(createdRecipe)
    })
  })
})

//     return res.send({
//       title,
//       vidUrl,
//       servings
//     //   response,
//     //   body
//     })
//   })
// })

  // Article.find(function (err, articles) {
  //   if (err) return next(err);
  //   res.render('index', {
  //     title: 'Scrape Test',
  //     articles: articles
  //   });
  // });
