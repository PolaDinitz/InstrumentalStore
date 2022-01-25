import { Avatar, TextField, Paper, InputAdornment, Button, Typography, Link } from '@mui/material';
import { Email as EmailIcon, Password as PasswordIcon, HowToReg as RegIcon, FormatColorText as TextInputIcon } from '@mui/icons-material';
import React, { ChangeEvent, useState } from 'react'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions/user.actions';
import { InputError } from '../redux/models/inputError.model';
import Validator from '../utils/validator'
import InputErrorMessage from '../enums/input-error-message';
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from '../redux/helpers/store';

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useSelector((state: RootState) => state.userState.loggedIn);

    const paperStyle = { 
        padding: 20, 
        minHeight: '10px', 
        width: '35vh', 
        margin: "50px auto",
        borderRadius: "30px"
    }

    const errorInitialState = {
        firstName: {} as InputError,
        lastName: {} as InputError,
        email: {} as InputError,
        password: {} as InputError,
        confirmPassword: {} as InputError
    }

    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');
    const confirmPassword = useFormInput('');
    const [error, setError] = useState(errorInitialState);

    const handleRegister = (event: any) => {
        event.preventDefault();
        if (validateRegisterForm()) {
            dispatch(userActions.register(firstName.value, lastName.value, email.value, password.value, confirmPassword.value));
        }
    }

    const handleLogout = (event: any) => {
        event.preventDefault();
        dispatch(userActions.logout());
    }

    const validateRegisterForm = (): boolean => {
        let isValid = true;
        let inputErrors = {...errorInitialState};
        if (Validator.isFieldEmpty(firstName.value)) {
            inputErrors.firstName = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
            }
            isValid = false;
        }
        if (Validator.isFieldEmpty(lastName.value)) {
            inputErrors.lastName = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
            }
            isValid = false;
        }
        if (!Validator.isEmailValid(email.value)) {
            inputErrors.email = {
                hasError: true,
                errorMessage: InputErrorMessage.EMAIL_INPUT_ERROR
            }
            isValid = false;
        }
        if (!Validator.isPasswordValid(password.value)) {
            inputErrors.password = {
                hasError: true,
                errorMessage: InputErrorMessage.PASSWORD_INPUT_ERROR
            }
            isValid = false;
        }
        if (!Validator.isPasswordsMatch(password.value, confirmPassword.value)) {
            inputErrors.confirmPassword = {
                hasError: true,
                errorMessage: InputErrorMessage.PASSWORDS_MISMATCH
            }
            isValid = false;
        }
        setError(inputErrors);
        return isValid;
    }

    return (
        <Paper elevation={10} style={paperStyle}>
            {!isLoggedIn &&
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", alignContent: "space-evenly", justifyContent: "space-around"}}>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Avatar sx={{ bgcolor: 'deepskyblue', width: 56, height: 56 }}><RegIcon/></Avatar>
                        <h1>Register</h1>
                    </Box>
                    <TextField
                        {...firstName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><TextInputIcon/></InputAdornment>
                            ),
                        }}
                        variant="filled" 
                        type="text" 
                        label="First Name" 
                        placeholder='Enter first name' 
                        fullWidth 
                        required
                        sx={{margin: "10px"}}
                        error={error?.firstName?.hasError}
                        helperText={error?.firstName?.hasError ? error.firstName.errorMessage : ''}
                    />
                    <TextField
                        {...lastName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><TextInputIcon /></InputAdornment>
                            ),
                        }}
                        variant="filled" 
                        type="text" 
                        label="Last Name" 
                        placeholder='Enter last name' 
                        fullWidth
                        required
                        sx={{margin: "10px"}}
                        error={error?.lastName?.hasError}
                        helperText={error?.lastName?.hasError ? error.lastName.errorMessage : ''}
                    />
                    <TextField
                        {...email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><EmailIcon /></InputAdornment>
                            ),
                        }}
                        variant="filled" 
                        type="text" 
                        label="Email" 
                        placeholder='Enter email' 
                        fullWidth
                        required
                        sx={{margin: "10px"}}
                        error={error?.email?.hasError}
                        helperText={error?.email?.hasError ? error.email.errorMessage : ''}
                    />
                    <TextField
                        {...password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><PasswordIcon /></InputAdornment>
                            ),
                        }}
                        variant="filled" 
                        type="password" 
                        label="Password" 
                        placeholder='Enter password' 
                        fullWidth
                        required
                        sx={{margin: "10px"}}
                        error={error?.password?.hasError}
                        helperText={error?.password?.hasError ? error.password.errorMessage : ''}
                    />
                    <TextField
                        {...confirmPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start"><PasswordIcon /></InputAdornment>
                            ),
                        }}
                        variant="filled" 
                        type="password" 
                        label="Confirm password" 
                        placeholder='Enter password again' 
                        fullWidth
                        required
                        sx={{margin: "10px"}}
                        error={error?.confirmPassword?.hasError}
                        helperText={error?.confirmPassword?.hasError ? error.confirmPassword.errorMessage : ''}
                    />
                    <Button 
                        sx={{margin: "10px"}} 
                        type="submit" 
                        variant="contained"
                        onClick={handleRegister}>
                            Register
                    </Button>
                    <Typography textAlign="center"> 
                        Already have an account?
                        <Link href="#" underline="none"> Login</Link>
                    </Typography>
                </Box>
            }
            {isLoggedIn &&
                <Box>
                    <Typography textAlign="center"> 
                        You are already logged in, do you want to logout?
                        <Button 
                            sx={{margin: "10px"}} 
                            type="submit" 
                            variant="contained"
                            onClick={handleLogout}>
                                Logout
                        </Button>
                    </Typography>
                </Box>
            } 
        </Paper>
    );
}

const useFormInput = (initialValue: String) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Register;
