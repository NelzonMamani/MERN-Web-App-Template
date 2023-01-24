// Import necessary modules
const request = require('supertest');
const { Message } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Message

// Test creating a new Message
describe('POST /Message', () => {
    it('should create a new Message', async () => {
        // Create a new Message
        const MessageData = { /* Message data */ };
        const res = await request(app)
            .post('/Message')
            .send(MessageData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(MessageData);

        // Check that the Message was saved to the database
        const MessageInDb = await Message.findById(res.body._id);
        expect(MessageInDb).toMatchObject(MessageData);
    });
});

// In-progress...
