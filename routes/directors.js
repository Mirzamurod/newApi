const express = require('express');
const router = express.Router();

const Director = require('./../model/Director');

// list search best10movie
router.get('/nma', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'filmlar'
            }
        },
        {
            $unwind: {
                path: '$movies'
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '_id.name',
                surname: '_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// list post
router.post('/', (req, res, next) => {
    const director = new Director(req.body);

    const promise = director
        .save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// list search id
router.get('/:director_id', (req, res, next) => {
    const promise = Director.findById(req.params.director_id);

    promise
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// list search id and update
router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

// list search id and delete
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id, req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
