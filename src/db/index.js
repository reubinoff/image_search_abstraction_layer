


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemas = require('./schemas')

mongoose.model('search_query', schemas.search_query);

function init(mongo_uri) {
    
    


    mongoose.Promise = global.Promise;
    mongoose.connect(mongo_uri);

    return mongo_uri
}

module.exports.init = init
module.exports.queries = require('./queries')