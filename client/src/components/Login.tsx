import { Avatar, TextField, Paper, InputAdornment, Button, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from '@mui/icons-material/Password';
import React, { useState } from 'react'
import { Box } from '@mui/system';

const Login = () => {
    const paperStyle = { 
        padding: 20, 
        minHeight: '300px', 
        width: '35vh', 
        margin: "50px auto",
        borderRadius: "30px"
    }

    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
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
                />
                <Button 
                    disabled={loading} 
                    sx={{margin: "10px"}} 
                    type="submit" 
                    variant="contained"
                    onClick={handleLogin}>{loading ? 'Loging...' : 'Login'} </Button>
                <Box>
                    {error && <small style={{ color: 'red' }}>{error}</small>}
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

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Login;