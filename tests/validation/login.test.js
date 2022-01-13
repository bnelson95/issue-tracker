import { expect, test } from '@jest/globals'
import validateLoginInput from '../../validation/login.js'

test('Email is required', () => {
  const { errors } = validateLoginInput({
    email: '',
    password: ''
  })
  expect(errors.email).toBe('Email is required')
})

test('Email is invalid', () => {
  const { errors } = validateLoginInput({
    email: 'notanemail',
    password: ''
  })
  expect(errors.email).toBe('Email is invalid')
})

test('Password is required', () => {
  const { errors } = validateLoginInput({
    email: 'test@test.com',
    password: ''
  })
  expect(errors.password).toBe('Password is required')
})

test('Email and Password are present and valid', () => {
  const { errors } = validateLoginInput({
    email: 'test@test.com',
    password: 'password'
  })
  expect(errors).toStrictEqual({})
})
