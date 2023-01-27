// Import necessary modules
const request = require('supertest');
const { PhotoVideo } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for PhotoVideo

// Test creating a new PhotoVideo
describe('POST /PhotoVideo', () => {
    it('should create a new PhotoVideo', async () => {
        // Create a new PhotoVideo
        const PhotoVideoData = { /* PhotoVideo data */ };
        const res = await request(app)
            .post('/PhotoVideo')
            .send(PhotoVideoData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(PhotoVideoData);

        // Check that the PhotoVideo was saved to the database
        const PhotoVideoInDb = await PhotoVideo.findById(res.body._id);
        expect(PhotoVideoInDb).toMatchObject(PhotoVideoData);
    });
});

// In-progress...
