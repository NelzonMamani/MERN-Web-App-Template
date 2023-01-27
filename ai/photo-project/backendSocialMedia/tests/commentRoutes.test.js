// Import necessary modules
const request = require('supertest');
const { Comment } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Comment

// Test creating a new Comment
describe('POST /Comment', () => {
    it('should create a new Comment', async () => {
        // Create a new Comment
        const CommentData = { /* Comment data */ };
        const res = await request(app)
            .post('/Comment')
            .send(CommentData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(CommentData);

        // Check that the Comment was saved to the database
        const CommentInDb = await Comment.findById(res.body._id);
        expect(CommentInDb).toMatchObject(CommentData);
    });
});

// In-progress...
