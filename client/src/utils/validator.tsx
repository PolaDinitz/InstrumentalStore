const isEmailValid = (email: String) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.valueOf())
}

const isPasswordValid = (password: String) => {
    return password.length >= 8;
}

const isFieldEmpty = (text: String) => {
    return text.length === 0;
}

const isPasswordsMatch = (password: String, confirmPassword: String) => {
    return !isFieldEmpty(password) && !isFieldEmpty(confirmPassword) && password === confirmPassword;
}

const Validator = {
    isFieldEmpty,
    isEmailValid,
    isPasswordValid,
    isPasswordsMatch
}

export default Validator;
