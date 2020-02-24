# intall
```
$ npm install crawl_str
```
# usage
```js
const crawl_str = require('crawl_str');
crawl_str(`
Make url list here
Lines that doesn't start with 'http' or 'https' are gonna be ignored


https://archive.is/ALjBy
https://archive.is/ALjBy
https://archive.is/ALjBy
https://archive.is/ALjBy
https://archive.is/ALjBy


`, {
    progress: (info, progress_ratio) => {
        console.log('progress', info.url, progress_ratio);
    },
    complete: faillist => {
        console.log('complete');
    }
}, './data/');
```
