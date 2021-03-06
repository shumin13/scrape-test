const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const async = require('async')

const router = express.Router()
const mongoose = require('mongoose')
// const Recipe = mongoose.model('Recipe')

  // Article = mongoose.model('Article')

module.exports = function (app) {
  app.use('/', router)
}

function recipeScrape (url, callback){
  console.log('concal call', url);
  request(url, function(err, response, body){
    if (err) return next(err)
    const $ = cheerio.load(body)
    console.log('scraping', url)
    let title = $('.entry-title').text()
    let vidUrl = $('.embed-container').find('iframe').attr('src')
    let time = $('.recipe-header').find('li:nth-child(2)').text()
    callback(null, {title, vidUrl, time})
    })
}

router.get('/', function (req, res, next) {
  // let url = 'https://www.burpple.com/sg'
  let url = 'http://themeatmen.sg/'

  request(url, function (err, response, body){
    if (err) return next(err)

    const $ = cheerio.load(body)

//     // this is for burpple.com/sg
//     let articles = $('.box-content-title').find('a').map(function (index, article){
//       return $(this).attr('href')
//     }).get()
//     return res.send({
//       articles
//     })
//   })
// })

    let urls = $('.featured').find('.entry-title > a').map(function(){
      return $(this).attr('href')
      }).get()

      //get each name, vidUrl and steps, then print the results
      async.concat(urls, recipeScrape, function(err, results) {
        if (err) return next(err)
        console.log(results)
      })

      // return res.send({
      //   urls
      // })


    })
  })


    // let title = $('.entry-title').text()
    // let vidUrl = $('.embed-container').find('iframe').attr('src')
    // let servings = $('.recipe-header').find('li').first().text()
    // let time = $('.recipe-header').find('li:nth-child(2)').text()
    // let skill = $('.recipe-header').find('li').last().text()
    // let steps = $('.recipe-instructions').find('li').map(function (index, step) {
    //   let $stepText = $(this).find('p')
    //   return $stepText.text()
    // }).get()

    // console.log(steps)

    // var newRecipe = Recipe.create({
    //   title,
    //   vidUrl,
    //   servings,
    //   time,
    //   skill,
    //   steps
    // }, function (err, createdRecipe) {
    //   if (err) return next(err)
    //   return res.send(createdRecipe)
    // })
//   })
// })

//     return res.send({
//       title,
//       vidUrl,
//       servings
//     //   response,
//     //   body
//     })
//   })
// })
