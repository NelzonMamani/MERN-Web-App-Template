// Import necessary modules
const request = require('supertest');
const { Search } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Search

// Test creating a new Search
describe('POST /Search', () => {
    it('should create a new Search', async () => {
        // Create a new Search
        const SearchData = { /* Search data */ };
        const res = await request(app)
            .post('/Search')
            .send(SearchData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(SearchData);

        // Check that the Search was saved to the database
        const SearchInDb = await Search.findById(res.body._id);
        expect(SearchInDb).toMatchObject(SearchData);
    });
});

// In-progress...
