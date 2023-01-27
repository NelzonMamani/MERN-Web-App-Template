// Import necessary modules
const request = require('supertest');
const { Album } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Album

// Test creating a new Album
describe('POST /Album', () => {
    it('should create a new Album', async () => {
        // Create a new Album
        const AlbumData = { /* Album data */ };
        const res = await request(app)
            .post('/Album')
            .send(AlbumData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(AlbumData);

        // Check that the Album was saved to the database
        const AlbumInDb = await Album.findById(res.body._id);
        expect(AlbumInDb).toMatchObject(AlbumData);
    });
});

// In-progress...
