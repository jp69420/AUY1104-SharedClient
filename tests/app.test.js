const request = require('supertest');
const { createApp } = require('../src/index');

const app = createApp();

describe('GET /health', () => {
  test('responde 200 con status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/saludo', () => {
  test('saludo sin parámetro responde 200', async () => {
    const res = await request(app).get('/api/saludo');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBeDefined();
  });

  test('saludo con nombre incluye el nombre en la respuesta', async () => {
    const res = await request(app).get('/api/saludo?nombre=Duoc');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toContain('Duoc');
  });
});

describe('POST /api/echo', () => {
  test('devuelve el body recibido con código 201', async () => {
    const body = { curso: 'AUY1104', modulo: 'Docker' };
    const res = await request(app)
      .post('/api/echo')
      .send(body)
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(body);
  });
});

describe('Ruta inexistente', () => {
  test('responde 404', async () => {
    const res = await request(app).get('/api/no-existe');
    expect(res.statusCode).toBe(404);
  });
});
