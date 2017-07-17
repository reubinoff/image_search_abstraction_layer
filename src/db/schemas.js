

var search_query = {
    search_srt :{ type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
}

module.exports.search_query = search_query
