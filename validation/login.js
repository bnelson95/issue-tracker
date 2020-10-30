import validator from 'validator';

const validateLoginInput = (data) => {
	let errors = {};

	// Convert empty fields to an empty string so we can use validator functions
	data.email = !validator.isEmpty(data.email) ? data.email : "";
	data.password = !validator.isEmpty(data.password) ? data.password : "";

	// Email checks
	if (validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	} else if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	// Password checks
	if (validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	}

	return {
		errors
	};
};

export default validateLoginInput;