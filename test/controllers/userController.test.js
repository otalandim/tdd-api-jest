const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

test('deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('deve inserir um usuário com sucesso', () => {
  return request(app).post('/users')
    .send({ name: 'Isaac Landim', mail, password: '123456' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Isaac Landim');
    });
});

test('não deve inserir um usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail: 'mail@mail.com', password: '123456' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Nome é um atributo obrigatório');
    });
});

test('não deve inserir um usuário sem email', async () => {
  const result = await request(app).post('/users')
    .send({ name: 'Isaac Landim', password: '123456' });
  expect(result.status).toBe(400);
  expect(result.body.message).toBe('Email é um atributo obrigatório');
});

test('não deve inserir um usuário sem senha', (done) => {
  request(app).post('/users')
    .send({ name: 'Isaac Landim', mail: 'mailsss@mail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Senha é um atributo obrigatório');
      done();
    });
});

test('não deve inserir um usuário com email existente', () => {
  return request(app).post('/users')
    .send({ name: 'Isaac Landim', mail, password: '123456' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Já existe um usuário com esse email');
    });
});
