import request from 'supertest';
import app from '../index';
import db from '../db/connection';

describe('/api/company', () => {
  beforeEach(async () => {
    await db('company_context').truncate();
    await db('team_context').truncate();
    await db('individual_context').truncate();
    await db('users').truncate();
    await db('teams').truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should return 404 when no company context is set', async () => {
    const res = await request(app).get('/api/company');
    expect(res.status).toBe(404);
  });

  it('should create a new company context', async () => {
    const context = { name: 'Test Company', domain: 'test.com' };
    const res = await request(app)
      .put('/api/company')
      .send({ context });
    expect(res.status).toBe(200);
    expect(res.body.context).toEqual(JSON.stringify(context));
  });

  it('should fetch the company context', async () => {
    const context = { name: 'Test Company', domain: 'test.com' };
    await request(app)
      .put('/api/company')
      .send({ context });

    const res = await request(app).get('/api/company');
    expect(res.status).toBe(200);
    expect(res.body.context).toEqual(JSON.stringify(context));
  });
});
