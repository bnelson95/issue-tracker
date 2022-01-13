import validator from 'validator'

const validateRegisterInput = (data) => {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !validator.isEmpty(data.name) ? data.name : ''
  data.email = !validator.isEmpty(data.email) ? data.email : ''
  data.password = !validator.isEmpty(data.password) ? data.password : ''
  data.password2 = !validator.isEmpty(data.password2) ? data.password2 : ''

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required'
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors
  }
}

export default validateRegisterInput
