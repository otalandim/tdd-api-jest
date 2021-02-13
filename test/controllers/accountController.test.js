const request = require('supertest');

const app = require('../../src/app');

let user;

beforeAll(async () => {
  const res = await app.services.userService.save({ name: 'User Account', mail: `${Date.now()}@mail.com`, passwd: '123456' });
  user = { ...res[0] };
  console.log(user);
});

test.only('deve inserir um conta com sucesso', () => {
  return request(app).post('/accounts')
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      console.log(result);
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

// test.skip('deve listar todas as contas', () => {
//  return app.db('accounts')
//    .insert({ name: 'Acc List', user_id: user.id })
//    .then(() => request(app).get('/accounts'))
//    .then((res) => {
//      expect(res.status).toBe(200);
//      expect(res.body.length).toBeGreaterThan(0);
//    });
// });
//
// test.skip('deve retornar uma conta por id', () => {
//  return app.db('accounts')
//    .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
//    .then((acc) => request(app).get(`/accounts/${acc[0].id}`))
//    .then((res) => {
//      expect(res.status).toBe(200);
//      expect(res.body.name).toBe('Acc By Id');
//      expect(res.body.user_id).toBe(user.id);
//    });
// });
