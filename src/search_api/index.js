



module.exports.search_img = function (img_to_search, paginate, cb) {
    return azure_search(img_to_search, paginate,cb)
}

function google_search(img_to_search, paginate, cb) {

}

function azure_search(img_to_search, paginate, cb) {
    const azure_api = require('./azure/api')
    azure_api(img_to_search, paginate, cb)
}