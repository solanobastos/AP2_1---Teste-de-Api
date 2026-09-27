import { describe, test, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app';
import { assinarToken } from '../../src/auth';

describe('API - Login', () => {

  test('deve realizar login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ "email": 'bruno@ulbra.br', "senha": 'senha123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

    test('deve rejeitar login com senha incorreta', async () => {
        const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ "email": 'bruno@ulbra.br', "senha": 'senha456' });

    expect(response.status).toBe(401);
    expect(response.body, 'Login com senha incorreta');
  });

    test('deve rejeitar login com e-mail incorreta', async () => {
        const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ "email": 'bruno@ulbra.com.br', "senha": 'senha123' });

    expect(response.status).toBe(401);
  });

      test('deve rejeitar login sem informar a senha', async () => {
        const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ "email": 'bruno@ulbra.br', "senha": '' });

    expect(response.status).toBe(400);
  });

        test('deve rejeitar login com e-mail malformado', async () => {
        const response = await request(app)
        .post('/api/v1/auth/login')
        .send({ "email": 'bruno@123123', "senha": 'senha123' });

    expect(response.status).toBe(400);
  });
});
