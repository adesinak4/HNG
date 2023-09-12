const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API Endpoints', () => {
    // Replace these with actual user data for testing
    const testUser = {
        name: 'Test User',
        // Add other required fields for user creation here
    };

    let createdUserId;

    describe('POST /api/', () => {
        it('should create a new user', (done) => {
            chai
                .request(server)
                .post('/api/')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal(testUser.name);
                    createdUserId = res.body.user_id;
                    done();
                });
        });

        it('should return an error for invalid user data', (done) => {
            chai
                .request(server)
                .post('/api/')
                .send({}) // Invalid data, should trigger validation error
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('GET /api/:user_id', () => {
        it('should retrieve a user by user_id', (done) => {
            chai
                .request(server)
                .get(`/api/${createdUserId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal(testUser.name);
                    done();
                });
        });

        it('should return an error for a non-existent user', (done) => {
            chai
                .request(server)
                .get('/api/nonexistent_user_id')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('PUT /api/:user_id', () => {
        it('should update a user by user_id', (done) => {
            const updatedUserData = {
                name: 'Updated User Name',
                // Add other fields to update as needed
            };

            chai
                .request(server)
                .put(`/api/${createdUserId}`)
                .send(updatedUserData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal(updatedUserData.name);
                    done();
                });
        });

        it('should return an error for updating a non-existent user', (done) => {
            chai
                .request(server)
                .put('/api/nonexistent_user_id')
                .send({}) // Invalid data, should trigger validation error
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    describe('DELETE /api/users/:user_id', () => {
        it('should delete a user by user_id', (done) => {
            chai
                .request(server)
                .delete(`/api/${createdUserId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('User deleted successfully');
                    done();
                });
        });

        it('should return an error for deleting a non-existent user', (done) => {
            chai
                .request(server)
                .delete('/api/nonexistent_user_id')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});
