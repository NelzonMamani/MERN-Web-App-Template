const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth Routes', () => {
    beforeEach(async () => {
        await User.deleteMany();
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'password123'
                });
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('name', 'Test User');
            expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
        });
    });

    describe('POST /auth/login', () => {
        it('should login an existing user', async () => {
            const user = new User({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            });
            await user.save();
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('accessToken');
            expect(res.body.data).toHaveProperty('refreshToken');
            expect(res.body.data).toHaveProperty('expiresIn');
        });
    });
});
