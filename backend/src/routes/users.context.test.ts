import request from 'supertest';
import app from '../index';
import db from '../db/connection';

describe('/api/users/:userId/context', () => {
  let user: any;

  beforeEach(async () => {
    await db('individual_context').truncate();
    await db('users').truncate();

    // Create a user to test with
    const [id] = await db('users').insert({ email: 'test@example.com' });
    user = await db('users').where({ id }).first();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new context for a user', async () => {
    const context = { description: 'Test context' };
    const res = await request(app)
      .post(`/api/users/${user.id}/context`)
      .send({ context });

    expect(res.status).toBe(201);
    expect(res.body.context).toEqual(JSON.stringify(context));
  });

  it('should fetch all contexts for a user', async () => {
    const context1 = { description: 'Test context 1' };
    const context2 = { description: 'Test context 2' };

    await request(app)
      .post(`/api/users/${user.id}/context`)
      .send({ context: context1 });

    await request(app)
      .post(`/api/users/${user.id}/context`)
      .send({ context: context2 });

    const res = await request(app).get(`/api/users/${user.id}/context`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should update a specific context for a user', async () => {
    const context = { description: 'Test context' };
    const updatedContext = { description: 'Updated test context' };

    const postRes = await request(app)
      .post(`/api/users/${user.id}/context`)
      .send({ context });

    const contextId = postRes.body.id;

    const putRes = await request(app)
      .put(`/api/users/${user.id}/context/${contextId}`)
      .send({ context: updatedContext });

    expect(putRes.status).toBe(200);
    expect(putRes.body.context).toEqual(JSON.stringify(updatedContext));
  });

  it('should delete a specific context for a user', async () => {
    const context = { description: 'Test context' };

    const postRes = await request(app)
      .post(`/api/users/${user.id}/context`)
      .send({ context });

    const contextId = postRes.body.id;

    const deleteRes = await request(app).delete(`/api/users/${user.id}/context/${contextId}`);

    expect(deleteRes.status).toBe(204);

    const getRes = await request(app).get(`/api/users/${user.id}/context`);

    expect(getRes.body.length).toBe(0);
  });
});
