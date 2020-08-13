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
       console.log("MongoDB Is Online!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB Is Not Connected!!!",err);
    });
}
