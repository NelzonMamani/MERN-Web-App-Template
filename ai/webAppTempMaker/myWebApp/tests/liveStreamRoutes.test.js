// Import necessary modules
const request = require('supertest');
const { LiveStream } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for LiveStream

// Test creating a new LiveStream
describe('POST /LiveStream', () => {
    it('should create a new LiveStream', async () => {
        // Create a new LiveStream
        const LiveStreamData = { /* LiveStream data */ };
        const res = await request(app)
            .post('/LiveStream')
            .send(LiveStreamData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(LiveStreamData);

        // Check that the LiveStream was saved to the database
        const LiveStreamInDb = await LiveStream.findById(res.body._id);
        expect(LiveStreamInDb).toMatchObject(LiveStreamData);
    });
});

// In-progress...
