// Import necessary modules
const request = require('supertest');
const { Event } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Event

// Test creating a new Event
describe('POST /Event', () => {
    it('should create a new Event', async () => {
        // Create a new Event
        const EventData = { /* Event data */ };
        const res = await request(app)
            .post('/Event')
            .send(EventData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(EventData);

        // Check that the Event was saved to the database
        const EventInDb = await Event.findById(res.body._id);
        expect(EventInDb).toMatchObject(EventData);
    });
});

// In-progress...
