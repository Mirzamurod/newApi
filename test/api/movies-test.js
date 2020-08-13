const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('./../../app');
const { token } = require('morgan');

chai.use(chaiHttp);

let token, moviesId

describe('api/movie lani testi', () => {
    before(done => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'Alex', password: '1234' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/Get movies', () => {
        it('Bu movies lani ekranga chiqarish kerak', done => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST movies', () => {
        it('Bu movies ga malumot qoshishi kerak', (done) => {
            const movie = {
                title = 'Kimdir Test',
                category = 'Boladi',
                country = 'Toshkent',
                year = '2077',
                director_id = '5f16dc994d9a65224c719fd9',
                imdb_score = '7.9',
            }

            chai.request(server)
                .post('/api/movies')
                .set('x-access-token', token)
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('abject');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('imdb_score');
                    moviesId = res.body._id;
                    done();
                })
        })
    })
});
