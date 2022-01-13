import validator from 'validator'

const validateUpdateProfileInput = (data) => {
  const errors = {}

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !validator.isEmpty(data.email) ? data.email : ''
  data.name = !validator.isEmpty(data.name) ? data.name : ''

  // Email checks
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  return {
    errors
  }
}

export default validateUpdateProfileInput
