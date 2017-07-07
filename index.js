// --------------------------------------------------------------------------------------------------------------------

'use strict'

// npm
const FeedParser = require('feedparser')
const string2stream = require('string-to-stream')

// --------------------------------------------------------------------------------------------------------------------

function log(msg) {
  console.log(msg)
}

function logThis(log, msg) {
  if ( !log ) return
  log(msg)
}

function once(fn) {
  var called = false
  return function(err, data) {
    if ( called ) return
    called = true
    fn(err, data)
  }
}

function fromStream(stream, url, opts, callback) {
  // check if there is no callback, it's probably the `opts` missing
  if ( typeof callback === 'undefined' ) {
    callback = opts
    opts = {
      log : log,
    }
  }

  // only call the callback once
  callback = once(callback)

  // create the feedparser
  logThis(opts.log, 'feedparser.creating')
  var feedparser = new FeedParser({
    normalize       : true,
    addmeta         : false,
    feedurl         : url,
    resume_saxerror : true,
  })

  // check for request errors
  stream.on('error', function (err) {
    callback(err)
  })

  // stream into feedparser
  stream.pipe(feedparser)

  // save data as we stumble upon it
  let data = {}

  // now listen to events from the feedparser
  feedparser.on('error', function(err) {
    logThis(opts.log, 'feedparser error :' + err)
    callback(err)
  })

  feedparser.on('meta', function(meta) {
    logThis(opts.log, 'meta.link:' + meta.link)

    // Going through fields in the same order as : https://jsonfeed.org/version/1

    // version (required, string)
    data.version = "https://jsonfeed.org/version/1"

    // title (required, string)
    data.title = meta.title

    // home_page_url (optional)
    if ( meta.link ) {
      data.home_page_url = meta.link
    }

    // feed_url (optional, string) - is self-referencing, but we don't have anything here to reference since we're generating from either
    // an RSS or Atom feed.

    // description (optional, string)
    if ( meta.description ) {
      data.description = meta.description
    }

    // user_comment (optional, string) - nothing in RSS or Atom can be used here

    // next_url (optional, string) - nothing in RSS or Atom can be used here

    // icon (optional, string) - nothing in RSS or Atom can be used here

    // favicon (optional, string) - Atom might have this
    if ( meta.favicon ) {
      data.favicon = meta.favicon
    }

    // author{name,url,avatar} (optional, must include one if exists)
    if ( meta.author ) {
      // even in Atom feeds with Author Name, Email and URI, feedparser only gives `meta.author`
      data.author = {
        name : meta.author,
      }
    }

    // expired (optional, boolean) - nothing in RSS or Atom can be used here

    // hubs (optional, array of objects) - ignoring for now

    // items (array, required) - add this now for appending to later
    data.items = []
  })

  feedparser.on('data', function(post) {
    logThis(opts.log, ' - post = ' + post.guid)

    let item = {}

    // Going through fields in the same order as : https://jsonfeed.org/version/1

    // id (required, string) - use `guid`
    if ( post.guid ) {
      item.guid = post.guid
    }
    else {
      // What should we do if there is no `guid` since `id` is required?
    }

    // url (optional, string) - the permalink if you like, may be the same as `id`
    if ( post.link ) {
      item.url = post.link
    }
    else {
      // What should we do if there is no `link` since we really should have a `url` here?
    }

    // external_url (optional, string) - ignore since we're adding a `url` anyway

    // title (optional, string)
    if ( post.title ) {
      item.title = post.title
    }

    // content_html/content_text (optional, string) - one must be present
    if ( post.description ) {
      item.content_html = post.description
    }

    // summary (optional, string)
    if ( post.summary ) {
      item.summary = post.summary
    }

    // image (optional, string)
    if ( post.image ) {
      if ( post.image.constructor === Object ) {
        // skip for now
      }
      else {
        item.image = post.image
      }
    }

    // banner_image (optional, string) - ???

    // date_published (optional, string)
    if ( post.pubDate ) {
      item.date_published = post.pubDate
    }

    // date_modified (optional, string) - ???

    // author (optional, object)
    if ( post.author ) {
      item.author = {
        name : post.author,
      }
    }

    // tags (optional, string[])

    // finally, push this `item` onto `data.items`
    data.items.push(item)
  })

  // and finish the request
  feedparser.on('end', function() {
    logThis(opts.log, 'feedparser.end')

    // now send the reply
    callback(null, data)
  })
}

function fromString(string, url, opts, callback) {
  let stream = string2stream(string)
  fromStream(stream, url, opts, callback)
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  fromStream,
  fromString,
}

// --------------------------------------------------------------------------------------------------------------------
