// Import necessary modules
const request = require('supertest');
const { Hashtag } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Hashtag

// Test creating a new Hashtag
describe('POST /Hashtag', () => {
    it('should create a new Hashtag', async () => {
        // Create a new Hashtag
        const HashtagData = { /* Hashtag data */ };
        const res = await request(app)
            .post('/Hashtag')
            .send(HashtagData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(HashtagData);

        // Check that the Hashtag was saved to the database
        const HashtagInDb = await Hashtag.findById(res.body._id);
        expect(HashtagInDb).toMatchObject(HashtagData);
    });
});

// In-progress...
