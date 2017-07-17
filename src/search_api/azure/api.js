const { config } = require('./config')
const http = require('https')
const lodash = require('lodash')
const Url = require('url');

module.exports = function (img_to_search, paginate, cb) {
    const url = 'api.cognitive.microsoft.com'

    const full_path = '/bing/v5.0/images/search?q=' + encodeURIComponent(img_to_search) + '&count=' + paginate

    console.log('full url path :' + full_path);

    send_request(url, full_path, function (results) {
        cb(results)
    })




}

function send_request(url, path, next) {
    var options = {
        host: url,
        path: path,
        headers: {
            'Ocp-Apim-Subscription-Key': config.key
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;

        });
        res.on('end', () => {
            console.log('No more data in response.');
            const parsedData = JSON.parse(rawData);
            if (lodash.isUndefined(parsedData.value)) {
                next([])
            } else {
                let results = []
                const images = parsedData.value
                images.forEach(function (image) {
                    const {
                        name,
                        contentUrl,
                        thumbnailUrl,
                        hostPageUrl
                    } = image
                    const img = {
                        url: Url.parse(contentUrl,true).query.r,
                        snippet: name,
                        thumbnail: thumbnailUrl,
                        context: hostPageUrl
                    }
                    
                    results.push(img)
                }, this);
                next(results)
            }
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();


    // https.request(options, function (res) {
    //     console.log('STATUS: ' + res.statusCode);
    //     console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     res.on('data', function (chunk) {
    //         console.log('BODY: ' + chunk);
    //     });
    // }).end();

}
//https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=locats&count=3