// --------------------------------------------------------------------------------------------------------------------

'use strict'

// core
const fs = require('fs')
const path = require('path')

// npm
var test = require('tape')

// local
var feed2json = require('../')

// --------------------------------------------------------------------------------------------------------------------

test('read a small RSS file', (t) => {
  t.plan(9)

  let stream = fs.createReadStream(path.join(__dirname, 'chilts-rss.xml'))
  let url = 'https://chilts.org/rss.xml'

  feed2json.fromStream(stream, url, (err, json) => {
    t.ok(!err, 'no error reading the RSS Feed')

    t.ok(json, 'something appeared in the JSON')
    t.ok(typeof json === 'object', 'The JSON is an object as expected')

    t.equal(json.version, "https://jsonfeed.org/version/1", 'JSONFeed version is correct')
    t.equal(json.title, "Andrew Chilton", "Title is correct")
    t.equal(json.home_page_url, "https://chilts.org", "Home Page URL is correct")
    t.equal(json.description, "A blog about tech.", "Description is correct")
    t.equal(json.author.name, "Andrew Chilton", "Author Name is correct")

    t.equal(json.items.length, 2, "There are two items as expected.")

    t.end()
  })
})

test('read a small Atom file', (t) => {
  t.plan(9)

  let stream = fs.createReadStream(path.join(__dirname, 'chilts-atom.xml'))
  let url = 'https://chilts.org/atom.xml'

  feed2json.fromStream(stream, url, (err, json) => {
    t.ok(!err, 'no error reading the RSS Feed')

    t.ok(json, 'something appeared in the JSON')
    t.ok(typeof json === 'object', 'The JSON is an object as expected')

    t.equal(json.version, "https://jsonfeed.org/version/1", 'JSONFeed version is correct')
    t.equal(json.title, "Andrew Chilton", "Title is correct")
    t.equal(json.home_page_url, "https://chilts.org/", "Home Page URL is correct")
    t.equal(json.description, "A blog about tech.", "Description is correct")
    t.equal(json.author.name, "Andrew Chilton", "Author Name is correct")

    t.equal(json.items.length, 2, "There are two items as expected.")

    t.end()
  })
})

// --------------------------------------------------------------------------------------------------------------------
