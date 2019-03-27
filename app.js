const express = require('express');
const superagent = require('superagent');
const checksum = require('checksum');
const fs = require('fs');
const nodeID3 = require('node-id3')
const filenamify = require('filenamify');
let Parser = require('rss-parser');
let parser = new Parser();

const applyMiddlewares = require('./middlewares')

const createApp = () => {
  const app = express()
  app.post('/rss', (req, res) => {
    var url = req.query.url;
    return parser.parseURL(req.query.url)
      .then(async feed => {
        let result = [];
        let itemsToFetch = 2 // feed.items.length; Takes to long to fetch all
        for (var i = 0; i < itemsToFetch; i++) {
          const item = feed.items[i];
          const stream = fs.createWriteStream('./files/' + item.title)
        
          result.push(new Promise((resolve, reject) => {
            stream.on('finish', function() {
              const sum = checksum('./files/' + item.title)
              console.log('Item number: ' + i + ' done');
              resolve({
                title: item.title,
                checksum: sum,
                url: item.enclosure.url
              })
            })
      
            stream.on("error", (err) => {
              console.log("error in request", err)
              reject(err);
            })
            superagent.get(item.enclosure.url).pipe(stream);
          }))
        }
    
        return Promise.all(result);
      })
      .then(result => res.send(result))
    
  });
  
  app.get('/id3', (req, res) => {
    const url = req.query.url;
    const fileName = filenamify(url, {replacement: '_'});
    
    const stream = fs.createWriteStream('./files/' + fileName)

    stream.on('finish', function() {
      const tags = nodeID3.read('./files/' + fileName);
      delete tags.raw;
      res.send(tags)
    })

    stream.on("error", (err) => {
      console.log("error in request", err)
      throw err;
    })

    superagent.get(url).pipe(stream);
  });
  
  applyMiddlewares(app)

  app.run = () => {
    app.listen(2500, () => console.log('Server running on PORT:' + 2500));
  }

  return app
}

module.exports = createApp