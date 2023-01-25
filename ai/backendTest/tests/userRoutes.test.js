const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const mongoose = require('mongoose');

describe('User routes', () => {
    beforeAll(async () => {
        // Connect to the database before running any tests
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });

    afterEach(async () => {
        // Clear the user collection after each test
        await User.deleteMany();
    });

    afterAll(async () => {
        // Close the database connection after all tests have finished
        await mongoose.connection.close();
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/users')
                .send({ email: 'test@example.com', password: 'password' });
            expect(res.status).toBe(200);
            expect(res.body.user).toHaveProperty('_id');
        });
    });
});
