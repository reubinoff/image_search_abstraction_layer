
var winston = require('winston');
var mongoose = require('mongoose');
var search_query = mongoose.model('search_query');
var _ = require('lodash')


module.exports.insert = function (img_query) {
    return new Promise(function (resolve, reject) {
        var search_query_model = new search_query({ search_srt: img_query })
        search_query_model
            .save()
            .then((rec) => {
                return resolve(rec)
            })
            .catch((err) => {
                return reject(err)
            });
    })
}


module.exports.get = function (img_query) {
    return new Promise(function (resolve, reject) {
        var usersProjection = {
            __v: false,
            _id: false
        };
        search_query
            .find({},usersProjection).sort({'date':-1}).limit(7)
            .then((recs) => {
                return resolve(recs)
            })
            .catch((err) => {
                return reject(err)
            });
    })
}