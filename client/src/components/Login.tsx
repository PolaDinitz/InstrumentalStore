import { Avatar, TextField, Paper, InputAdornment, Button, Typography, Link } from '@mui/material';
import { Email as EmailIcon, Password as PasswordIcon, Login as LoginIcon } from '@mui/icons-material';
import React, { ChangeEvent, useState } from 'react'
import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/user.actions';
import { InputError } from '../redux/models/inputError.model';
import Validator from '../utils/validator'
import InputErrorMessage from '../enums/input-error-message';
import "react-toastify/dist/ReactToastify.css";

const Login = (props: any) => {
    const paperStyle = { 
        padding: 20, 
        minHeight: '300px', 
        width: '35vh', 
        margin: "50px auto",
        borderRadius: "30px"
    }

    const errorInitialState = {
        email: {} as InputError,
        password: {} as InputError
    }

    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(errorInitialState);
    const [loading, setLoading] = useState(false);

    const handleLogin = (event: any) => {
        event.preventDefault();
        if (validateLoginForm()) {
            props.login(email.value, password.value);
        }
    }

    const validateLoginForm = (): boolean => {
        let isValid = true;
        let inputErrors = {...errorInitialState};
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
        setError(inputErrors);
        return isValid;
    }

    return (
        <Paper elevation={10} style={paperStyle}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", alignContent: "space-evenly", justifyContent: "space-around"}}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Avatar sx={{ bgcolor: 'deepskyblue', width: 56, height: 56 }}><LoginIcon/></Avatar>
                    <h1>Login</h1>
                </Box>
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
                    placeholder='Enter Email' 
                    fullWidth 
                    required
                    sx={{margin: "10px"}}
                    error={error && error.email?.hasError}
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
                    placeholder='Enter Password' 
                    fullWidth
                    required
                    sx={{margin: "10px"}}
                    error={error && error.password?.hasError}
                    helperText={error?.password?.hasError ? error.password.errorMessage : ''}
                />
                <Button 
                    disabled={loading} 
                    sx={{margin: "10px"}} 
                    type="submit" 
                    variant="contained"
                    onClick={handleLogin}>{loading ? 'Loging...' : 'Login'}
                </Button>
                <Box>
                    {/* {error && <small style={{ color: 'red' }}>{error}</small>} */}
                </Box>
                <Typography textAlign="center"> 
                    Don't have an account?
                    <Link href="#" underline="none"> Register</Link>
                </Typography>
            </Box>
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

const mapStateToProps = (state: any) => {
    return {
        userState: state.userState
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    login: (email: String, password: String) => dispatch(userActions.login(email, password)),
});
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
