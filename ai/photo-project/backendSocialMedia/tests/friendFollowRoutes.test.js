// Import necessary modules
const request = require('supertest');
const { FriendFollow } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for FriendFollow

// Test creating a new FriendFollow
describe('POST /FriendFollow', () => {
    it('should create a new FriendFollow', async () => {
        // Create a new FriendFollow
        const FriendFollowData = { /* FriendFollow data */ };
        const res = await request(app)
            .post('/FriendFollow')
            .send(FriendFollowData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(FriendFollowData);

        // Check that the FriendFollow was saved to the database
        const FriendFollowInDb = await FriendFollow.findById(res.body._id);
        expect(FriendFollowInDb).toMatchObject(FriendFollowData);
    });
});

// In-progress...
