    res.body.data).toHaveProperty('name', 'Test User');
            expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/users')
                .set('x-auth-token', token)
                .send({
                    name: 'New User',
                    email: 'newuser@example.com',
                    password: 'password123'
                });
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('name', 'New User');
            expect(res.body.data).toHaveProperty('email', 'newuser@example.com');
        });
    });

    describe('PUT /users/:id', () => {
        it('should update a user by id', async () => {
            const res = await request(app)
                .put(`/api/users/${userId}`)
                .set('x-auth-token', token)
                .send({
                    name: 'Updated User'
                });
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('name', 'Updated User');
            expect(res.body.data).toHaveProperty('email', 'testuser@example.com');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user by id', async () => {
            const res = await request(app)
                .delete(`/api/users/${userId}`)
                .set('x-auth-token', token);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toEqual({});
        });
    });
});
