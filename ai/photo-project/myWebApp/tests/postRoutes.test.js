// Import necessary modules
const request = require('supertest');
const { Post } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Post

// Test creating a new Post
describe('POST /Post', () => {
    it('should create a new Post', async () => {
        // Create a new Post
        const PostData = { /* Post data */ };
        const res = await request(app)
            .post('/Post')
            .send(PostData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(PostData);

        // Check that the Post was saved to the database
        const PostInDb = await Post.findById(res.body._id);
        expect(PostInDb).toMatchObject(PostData);
    });
});

// In-progress...
