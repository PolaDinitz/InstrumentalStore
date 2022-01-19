const isEmailValid = (email: String) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.valueOf())
}

const isPasswordValid = (password: String) => {
    return password.length >= 8;
}

const Validator = {
    isEmailValid,
    isPasswordValid
}

export default Validator;
