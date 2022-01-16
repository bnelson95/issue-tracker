import { test, expect, beforeEach, afterEach } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'

import { initExpress } from '../../../express'
import { TEST_RUN_MONGO_URI } from '../../../config.js'

beforeEach((done) => {
  mongoose.connect(TEST_RUN_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }, () => done())
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

const NAME = 'Test User'
const EMAIL = 'test@test.com'
const INVALID_EMAIL = 'test@'
const PASSWORD = 'password'
const PASSWORD2 = 'notmatchingpassword'

const REGISTER_VALID = {
  name: NAME,
  email: EMAIL,
  password: PASSWORD,
  password2: PASSWORD
}

const REGISTER_NO_NAME = {
  name: '',
  email: EMAIL,
  password: PASSWORD,
  password2: PASSWORD
}

const REGISTER_NO_EMAIL = {
  name: NAME,
  email: '',
  password: PASSWORD,
  password2: PASSWORD
}

const REGISTER_INVALID_EMAIL = {
  name: NAME,
  email: INVALID_EMAIL,
  password: PASSWORD,
  password2: PASSWORD
}

const REGISTER_NOT_MATCHING_PASSWORDS = {
  name: NAME,
  email: EMAIL,
  password: PASSWORD,
  password2: PASSWORD2
}

test('Attempt register with no name: Expects error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NO_NAME)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.name).toBe('Name is required')
    })
})

test('Attempt register with no email: Expects error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NO_EMAIL)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.email).toBe('Email is required')
    })
})

test('Attempt register with invalid email: Expects error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_INVALID_EMAIL)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.email).toBe('Email is invalid')
    })
})

test('Attempt register with non-matching passwords: Expects error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NOT_MATCHING_PASSWORDS)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.password2).toBe('Passwords must match')
    })
})

async function register (app = initExpress()) {
  await request(app)
    .post('/api/user/register')
    .send(REGISTER_VALID)
    .expect(200)
    .then((response) => {
      expect(response.body.user.name).toBe(NAME)
      expect(response.body.user.email).toBe(EMAIL)
      expect(response.body.user.password).not.toBe(PASSWORD)
    })
}

test('Register: Expects success', async () => {
  await register()
})

test('Register then attempt another Register with the same email: Expects error', async () => {
  await register()
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_VALID)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.email).toBe('Email already exists')
    })
})


// LOGIN ------------------------------------------------------------------------------------------

const LOGIN_VALID = {
  email: EMAIL,
  password: PASSWORD
}

const LOGIN_WRONG_PASSWORD = {
  email: EMAIL,
  password: PASSWORD2
}

async function login (app = initExpress()) {
  let token = ''
  await request(app)
    .post('/api/user/login')
    .send(LOGIN_VALID)
    .expect(200)
    .then((response) => {
      expect(response.body.token).toBeTruthy()
      // TODO check cookie
      token = response.body.token
    })
  return token
}

test('Register then attempt login with incorrect password: Expects error', async () => {
  await register()
  await request(initExpress())
    .post('/api/user/login')
    .send(LOGIN_WRONG_PASSWORD)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.password).toBe('Password incorrect')
    })
})

test('Register then login: Expects success', async () => {
  await register()
  await login()
})

test('Register, login, then logout: Expects success', async () => {
  await register()
  await login()
  await request(initExpress())
    .get('/api/user/logout')
    .expect(200)
    .then((response) => {
      expect(response.body.success).toBeTruthy()
    })
})

test('Get tasks: Expects success', async () => {
  const app = initExpress()
  await register(app)
  const token = await login(app)
  expect(token).toBeTruthy()
  await request(app)
    .get('/api/task')
    .set('Cookie', `token=${token};`)
    .set('Content-Type', 'application/json')
    .expect(200)
    .then((response) => {
      expect(response.body.tasks).toStrictEqual([])
    })
})