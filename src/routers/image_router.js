var express = require('express');
var _ = require('lodash')
var db = require('../db')
var search_api = require('../search_api').search_img
module.exports = function () {
    var router = express.Router()


    router.get('/imagesearch/:img_query', parser)
    router.get('/latest/imagesearch/', last_results)

    return router
}

function last_results(req, res, next) {
    db.queries.get()
        .then((recs) => {
            recs.s
            return res.json(recs)
        },
        (err) => {
            console.error(err)
        })
        .catch((err) => {
            console.error(err)
        })

}



function parser(req, res, next) {
    if (_.isUndefined(req.params.img_query)) {
        return next()
    }
    if (_.isUndefined(req.query.offset)) {
        return next()
    }
    const search_item = req.params.img_query
    const offset = req.query.offset

    db.queries.insert(search_item)
        .then((rec) => {
            search_api(search_item, offset, function (results) {
                return res.json(results)
            })
        },
        (err) => {
            console.error(err)
        })
        .catch((err) => {
            console.error(err)
        })



    console.log(req.query);
}