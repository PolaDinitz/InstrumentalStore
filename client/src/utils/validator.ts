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

const isPriceValid = (price: number) => {
    return price !== undefined && price > 0;
}


const Validator = {
    isFieldEmpty,
    isEmailValid,
    isPasswordValid,
    isPasswordsMatch,
    isPriceValid
}

export default Validator;
