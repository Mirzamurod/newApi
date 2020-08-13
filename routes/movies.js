const express = require('express');
const router = express.Router();

const Movie = require('./../model/Movie');

// top10
router.get('/top10', (req, res, next) => {
    const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });

    promise
        .then(data => {
            if (!data) res.json('blablabla');

            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// post
router.post('/', (req, res, next) => {
    // const { title, category, country, year, imdb_score } = req.body;
    // const movie = new Movie({
    //     title,
    //     category,
    //     country,
    //     year,
    //     imdb_score
    // })

    // movie.save((err, data) => {
    //     if(err)
    //         res.json(err)

    //     res.json(data)
    //})

    const movie = new Movie(req.body);

    const promise = movie.save();
    promise
        .then(data => {
            // res.json({ status: 1 });
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

// list all movie
router.get('/', (req, res, next) => {
    const movie = Movie.find({});

    promise
        .then(data => {
            // res.json({ status: 1 });
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

// list id movies
router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise
        .then(data => {
            if (!data) res.json('Bu ID topilmadi!!!');

            res.json(data);
        })
        .catch(err => {
            res.json(err);
            console.log(err);
        });
});

// list update
router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body);

    promise
        .then(data => {
            if (!data) res.json('Bu ID topilmadi!!!');

            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id, req.body);

    promise
        .then(data => {
            if (!data) res.json('Bu ID topilmadi');

            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// between
router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;

    const promise = Movie.find({
        year: {
            $gte: start_year,
            $lte: end_year
        }
    });

    promise
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
