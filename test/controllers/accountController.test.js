const request = require('supertest');

const app = require('../../src/app');

let user;

beforeAll(async () => {
  const res = await app.services.userService.create({ name: 'bla', mail: `${Date.now()}@mail.com`, passwd: '123456' });
  user = { ...res };
});

test('deve inserir um conta com sucesso', () => {
  return request(app).post('/accounts')
    .send({ name: 'Acc #1', userId: user.id })
    .then((result) => {
      console.log(result.body);
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('deve listar todas as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Conta Lista', userId: user.id })
    .then(() => request(app).get('/accounts'))
    .then((res) => {
      console.log('res.body.length', res.body.length);
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('deve retornar uma conta por id', () => {
  return app.db('accounts')
    .insert({ name: 'Conta Id', userId: user.id }, ['id'])
    .then((acc) => request(app).get(`/accounts/${acc[0].id}`))
    .then((res) => {
      console.log('res.body.userId', res.body.userId);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Conta Id');
      expect(res.body.userId).toBe(user.id);
    });
});

test('deve alterar uma conta com sucesso', () => {
  return app.db('accounts')
    .insert({ name: 'Conta para Atualizar', userId: user.id }, ['id'])
    .then((acc) => request(app).put(`/accounts/${acc[0].id}`)
      .send({ name: 'Conta Atualizada' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Conta Atualizada');
    });
});

test('deve remover uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'ContaRemoveById', userId: user.id }, ['id'])
    .then((acc) => request(app).delete(`/accounts/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('não deve inserir uma conta sem nome', () => {

});
