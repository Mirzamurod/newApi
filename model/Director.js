const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    bio: {
        type: String
    }
});

module.exports = mongoose.model('director', DirectorSchema);
