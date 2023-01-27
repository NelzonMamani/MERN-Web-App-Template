// Import necessary modules
const request = require('supertest');
const { Advertisment } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Advertisment

// Test creating a new Advertisment
describe('POST /Advertisment', () => {
    it('should create a new Advertisment', async () => {
        // Create a new Advertisment
        const AdvertismentData = { /* Advertisment data */ };
        const res = await request(app)
            .post('/Advertisment')
            .send(AdvertismentData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(AdvertismentData);

        // Check that the Advertisment was saved to the database
        const AdvertismentInDb = await Advertisment.findById(res.body._id);
        expect(AdvertismentInDb).toMatchObject(AdvertismentData);
    });
});

// In-progress...
