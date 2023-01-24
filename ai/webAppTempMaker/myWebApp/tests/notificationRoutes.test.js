// Import necessary modules
const request = require('supertest');
const { Notification } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for Notification

// Test creating a new Notification
describe('POST /Notification', () => {
    it('should create a new Notification', async () => {
        // Create a new Notification
        const NotificationData = { /* Notification data */ };
        const res = await request(app)
            .post('/Notification')
            .send(NotificationData);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(NotificationData);

        // Check that the Notification was saved to the database
        const NotificationInDb = await Notification.findById(res.body._id);
        expect(NotificationInDb).toMatchObject(NotificationData);
    });
});

// In-progress...
