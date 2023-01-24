// Import necessary modules
const request = require('supertest');
const { LikeDislike } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for LikeDislike

// Test creating a new LikeDislike
describe('POST /LikeDislike', () => {
    it('should create a new LikeDislike', async () => {
        // Create a new LikeDislike
        const LikeDislikeData = { /* LikeDislike data */ };
        const res = await request(app)
            .post('/LikeDislike')
            .send(LikeDislikeData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(LikeDislikeData);

        // Check that the LikeDislike was saved to the database
        const LikeDislikeInDb = await LikeDislike.findById(res.body._id);
        expect(LikeDislikeInDb).toMatchObject(LikeDislikeData);
    });
});

// In-progress...
