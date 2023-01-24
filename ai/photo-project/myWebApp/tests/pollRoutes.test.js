// Import necessary modules
const request = require('supertest');
const { Poll } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Poll

// Test creating a new Poll
describe('POST /Poll', () => {
    it('should create a new Poll', async () => {
        // Create a new Poll
        const PollData = { /* Poll data */ };
        const res = await request(app)
            .post('/Poll')
            .send(PollData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(PollData);

        // Check that the Poll was saved to the database
        const PollInDb = await Poll.findById(res.body._id);
        expect(PollInDb).toMatchObject(PollData);
    });
});

// In-progress...
