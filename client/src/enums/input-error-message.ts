enum InputErrorMessage {
    EMPTY_INPUT_ERROR = "Field is required",
    EMAIL_INPUT_ERROR = "Email format is invalid",
    PASSWORD_INPUT_ERROR = "Password must be at least 8 characters",
    PASSWORDS_MISMATCH = "Password and confirm password does not match",
    PRICE_INPUT_ERROR = "Price must be greater than zero"
}

export default InputErrorMessage;
