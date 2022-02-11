import { useSelector } from "react-redux";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from "../../redux/Cart/cart.selectors";
import { Box, Button, Container, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { CartProduct } from "../../redux/Cart/cart.model";
import {
    House as HouseIcon,
    Email as EmailIcon,
    FormatColorText as TextInputIcon,
    HowToReg as RegIcon,
    Password as PasswordIcon
} from '@mui/icons-material';
import { InputError } from "../../models/inputError.model";
import { ChangeEvent, useState } from "react";

const Cart = () => {
    const cartTotal: Number = useSelector(selectCartTotal);
    const itemCount: Number = useSelector(selectCartItemsCount);
    const errorInitialState = {
        firstName: {} as InputError,
        lastName: {} as InputError,
        email: {} as InputError,
        address: {} as InputError,
    }

    const firstName = useFormInput('');
    const lastName = useFormInput('');
    const email = useFormInput('');
    const address = useFormInput('');
    const [error, setError] = useState(errorInitialState);
    const paperStyle = {
        padding: 20,
        minHeight: '10px',
        width: '35vh',
        margin: "50px auto",
        borderRadius: "30px"
    }

    const handleCheckout = (event: any) => {
        event.preventDefault();
       //if (validateRegisterForm()) {
            //dispatch(userActions.register(firstName.value, lastName.value, email.value, password.value, confirmPassword.value));
        //}
    }


    return (
        <Paper elevation={0} style={paperStyle}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "space-evenly", justifyContent: "space-around" }}>
                <Typography variant="h3" component="h3">
                    Checkout:
                </Typography>
                <Typography variant="h4" component="h4">
                    order summary:
                </Typography>
                <Box key="total" sx={{ margin: "5px" }}>
                    <Typography variant="h5" component="h5">
                        Order Total: {cartTotal}
                    </Typography>
                    <Typography variant="h5" component="h5">
                        Item count: {itemCount}
                    </Typography>
                </Box>
                <Typography variant="h4" component="h4">
                    checkout details:
                </Typography>
                <TextField
                    {...firstName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><TextInputIcon /></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    type="text"
                    label="First Name"
                    placeholder='Enter first name'
                    fullWidth
                    required
                    sx={{ margin: "10px" }}
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
                    sx={{ margin: "10px" }}
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
                    sx={{ margin: "10px" }}
                    error={error?.email?.hasError}
                    helperText={error?.email?.hasError ? error.email.errorMessage : ''}
                />
                <TextField
                    {...address}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><HouseIcon /></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    type="text"
                    label="Address"
                    placeholder='Enter address'
                    fullWidth
                    required
                    sx={{ margin: "10px" }}
                    error={error?.address?.hasError}
                    helperText={error?.address?.hasError ? error.address.errorMessage : ''}
                />
                <Button
                    sx={{ margin: "10px" }}
                    type="submit"
                    variant="contained"
                    onClick={handleCheckout}>
                    Place order
                </Button>
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
export default Cart;
