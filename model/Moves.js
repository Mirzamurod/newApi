const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoviSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String
        //required: true,
        //unique: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MoviSchema);
