import request from 'supertest';
import app from '../index';
import db from '../db/connection';

describe('/api/teams/:teamId/context', () => {
  let team: any;

  beforeEach(async () => {
    await db('team_context').truncate();
    await db('teams').truncate();

    // Create a team to test with
    const [id] = await db('teams').insert({ name: 'Test Team' });
    team = await db('teams').where({ id }).first();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new context for a team', async () => {
    const context = { description: 'Test context' };
    const res = await request(app)
      .post(`/api/teams/${team.id}/context`)
      .send({ context });

    expect(res.status).toBe(201);
    expect(res.body.context).toEqual(JSON.stringify(context));
  });

  it('should fetch all contexts for a team', async () => {
    const context1 = { description: 'Test context 1' };
    const context2 = { description: 'Test context 2' };

    await request(app)
      .post(`/api/teams/${team.id}/context`)
      .send({ context: context1 });

    await request(app)
      .post(`/api/teams/${team.id}/context`)
      .send({ context: context2 });

    const res = await request(app).get(`/api/teams/${team.id}/context`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should update a specific context for a team', async () => {
    const context = { description: 'Test context' };
    const updatedContext = { description: 'Updated test context' };

    const postRes = await request(app)
      .post(`/api/teams/${team.id}/context`)
      .send({ context });

    const contextId = postRes.body.id;

    const putRes = await request(app)
      .put(`/api/teams/${team.id}/context/${contextId}`)
      .send({ context: updatedContext });

    expect(putRes.status).toBe(200);
    expect(putRes.body.context).toEqual(JSON.stringify(updatedContext));
  });

  it('should delete a specific context for a team', async () => {
    const context = { description: 'Test context' };

    const postRes = await request(app)
      .post(`/api/teams/${team.id}/context`)
      .send({ context });

    const contextId = postRes.body.id;

    const deleteRes = await request(app).delete(`/api/teams/${team.id}/context/${contextId}`);

    expect(deleteRes.status).toBe(204);

    const getRes = await request(app).get(`/api/teams/${team.id}/context`);

    expect(getRes.body.length).toBe(0);
  });
});
