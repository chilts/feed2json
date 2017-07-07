# feed2json #

This package is coming soon once it has been battle tested.

In the meantime, please see <a href="https://feed2json.org/">feed2json.org</a> for more details and a working demo.

## JSONFeed ##

Even though JSON has it's problems, it is hundreds of times better than dealing with XML. Therefore, this package is
designed to help you convert from RSS or Atom feeds into [JSONFeed](https://jsonfeed.org/) format. At that point you
know what you have and can deal with is more effectively. It will also convert any non-UTF8 feeds too since JSON is
UTF8 by default.

## Synopsis ##

This project contains the converter but does not fetch the feed for you, you must do that yourself.

Here is an example showing a conversion of an RSS file on disk:

```javascript
let stream = fs.createReadStream(path.join(__dirname, 'rss.xml'))

feed2json.fromStream(stream, url, (err, json) => {
  // check for err
  // otherwise `json` is populated with JSONFeed format
})
```

Here is an example showing a conversion from an Atom feed fetched with `request`:

```javascript
let url = "https://chilts.org/atom.xml"
let req = request(url)

feed2json.fromStream(req, url, (err, json) => {
  // check for err
  // otherwise `json` is populated with JSONFeed format
})
```

## Author ##

By [Andrew Chilton](https://chilts.org/), [@twitter](https://twitter.com/andychilton).

For [AppsAttic](https://appsattic.com/), [@AppsAttic](https://twitter.com/AppsAttic).

And [ZenType](https://zentype.com/), [@ZenTypeHQ](https://twitter.com/ZenTypeHQ).

## License ##

ISC.

(Ends)
