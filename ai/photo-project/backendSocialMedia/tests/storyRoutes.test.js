// Import necessary modules
const request = require('supertest');
const { Story } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Story

// Test creating a new Story
describe('POST /Story', () => {
    it('should create a new Story', async () => {
        // Create a new Story
        const StoryData = { /* Story data */ };
        const res = await request(app)
            .post('/Story')
            .send(StoryData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(StoryData);

        // Check that the Story was saved to the database
        const StoryInDb = await Story.findById(res.body._id);
        expect(StoryInDb).toMatchObject(StoryData);
    });
});

// In-progress...
