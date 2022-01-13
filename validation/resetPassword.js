import validator from 'validator'

const validateResetPasswordInput = (data) => {
  const errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.newPassword = !validator.isEmpty(data.newPassword) ? data.newPassword : ''
  data.newPassword2 = !validator.isEmpty(data.newPassword2) ? data.newPassword2 : ''

  // Password checks
  if (validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = 'Confirm password is required'
  }
  if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = 'Password must be at least 6 characters'
  }
  if (!validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = 'Passwords must match'
  }

  return {
    errors
  }
}

export default validateResetPasswordInput
