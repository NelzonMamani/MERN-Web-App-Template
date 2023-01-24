// Import necessary modules
const request = require('supertest');
const { Profile } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Profile

// Test creating a new Profile
describe('POST /Profile', () => {
    it('should create a new Profile', async () => {
        // Create a new Profile
        const ProfileData = { /* Profile data */ };
        const res = await request(app)
            .post('/Profile')
            .send(ProfileData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(ProfileData);

        // Check that the Profile was saved to the database
        const ProfileInDb = await Profile.findById(res.body._id);
        expect(ProfileInDb).toMatchObject(ProfileData);
    });
});

// In-progress...
