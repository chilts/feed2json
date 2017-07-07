# feed2json #

Converts both RSS and Atom feeds to JSONFeed format. A hosted version exists at [feed2json.org](https://feed2json.org).

## JSONFeed ##

Even though JSON has it's problems, it is hundreds of times better than dealing with XML. Therefore, this package is
designed to help you convert from RSS or Atom feeds into [JSONFeed](https://jsonfeed.org/) format. At that point you
know what you have and can deal with is more effectively. It will also convert any non-UTF8 feeds too since JSON is
UTF8 by default.

## Synopsis ##

This project contains the converter but does not fetch the feed for you, you must do that yourself.

Example showing a conversion of an RSS file on disk:

```javascript
let stream = fs.createReadStream(path.join(__dirname, 'rss.xml'))

feed2json.fromStream(stream, url, (err, json) => {
  // check for err
  // otherwise `json` is populated with JSONFeed format
})
```

Example showing a conversion from an Atom feed fetched with `request`:

```javascript
let url = "https://chilts.org/atom.xml"
let req = request(url)

feed2json.fromStream(req, url, (err, json) => {
  // check for err
  // otherwise `json` is populated with JSONFeed format
})
```

Example showing a conversion from a feed already in a string variable:

```javascript
let url = "https://chilts.org/rss.xml"
let str = [
    '<?xml version="1.0" encoding="UTF-8"?>"',
    '<rss version="2.0">',
    '...etc...',
    '</rss>',
].join('\n')

feed2json.fromString(str, url, (err, json) => {
  // check for err
  // otherwise `json` is populated with JSONFeed format
})
```

## feed2json.org ##

Note: this package has been tested on https://feed2json.org and has converted many feeds to JSONFeed. It's not perfect
I'm sure, but it's doing a decent job. Please send any PRs or patches my way so we can improve the conversion process
together. :) Many thanks.

## Author ##

By [Andrew Chilton](https://chilts.org/), [@twitter](https://twitter.com/andychilton).

For [AppsAttic](https://appsattic.com/), [@AppsAttic](https://twitter.com/AppsAttic).

And [ZenType](https://zentype.com/), [@ZenTypeHQ](https://twitter.com/ZenTypeHQ).

## License ##

ISC.

(Ends)
