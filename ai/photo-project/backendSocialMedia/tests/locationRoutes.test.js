// Import necessary modules
const request = require('supertest');
const { Location } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Location

// Test creating a new Location
describe('POST /Location', () => {
    it('should create a new Location', async () => {
        // Create a new Location
        const LocationData = { /* Location data */ };
        const res = await request(app)
            .post('/Location')
            .send(LocationData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(LocationData);

        // Check that the Location was saved to the database
        const LocationInDb = await Location.findById(res.body._id);
        expect(LocationInDb).toMatchObject(LocationData);
    });
});

// In-progress...
