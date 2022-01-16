import { test, expect, beforeEach, afterEach } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'

import { initExpress } from '../../../express'

beforeEach((done) => {
  mongoose.connect('mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done())
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

test('POST /api/user/register: No name: Error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NO_NAME)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.name).toBe('Name is required')
    })
})

test('POST /api/user/register: No email: Error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NO_EMAIL)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.email).toBe('Email is required')
    })
})

test('POST /api/user/register: Invalid email: Error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_INVALID_EMAIL)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.email).toBe('Email is invalid')
    })
})

test('POST /api/user/register: Non-matching passwords: Error', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_NOT_MATCHING_PASSWORDS)
    .expect(200)
    .then((response) => {
      expect(response.body.errors.password2).toBe('Passwords must match')
    })
})

test('POST /api/user/register: Valid input: Success', async () => {
  await request(initExpress())
    .post('/api/user/register')
    .send(REGISTER_VALID)
    .expect(200)
    .then((response) => {
      expect(response.body.user.name).toBe(NAME)
      expect(response.body.user.email).toBe(EMAIL)
      expect(response.body.user.password).not.toBe(PASSWORD)
    })
})
