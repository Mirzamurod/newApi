const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        'mongodb+srv://Mirzamurod:microlab1M@cluster0.u3cwe.mongodb.net/<dbname>?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    );

    mongoose.connection.on('open', () => {
        //console.log("Mongo DB Bog'landi!!!")
    });
    mongoose.connection.on('error', err => {
        console.log("XATO: Mongo DB Bog'lanmadi!!!", err);
    });

    mongoose.Promise = global.Promise;
};
