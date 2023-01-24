// Import necessary modules
const request = require('supertest');
const { User } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for User

// Test creating a new User
describe('POST /User', () => {
    it('should create a new User', async () => {
        // Create a new User
        const UserData = { /* User data */ };
        const res = await request(app)
            .post('/User')
            .send(UserData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(UserData);

        // Check that the User was saved to the database
        const UserInDb = await User.findById(res.body._id);
        expect(UserInDb).toMatchObject(UserData);
    });
});

// In-progress...
