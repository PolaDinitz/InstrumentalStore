import {useDispatch, useSelector} from "react-redux";
import {selectCartItems, selectCartItemsCount, selectCartTotal} from "../../redux/Cart/cart.selectors";
import {Box, Button, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import InputErrorMessage from '../../enums/input-error-message';
import {AppDispatch} from "../../type";
import {Email as EmailIcon, House as HouseIcon,} from '@mui/icons-material';
import {InputError} from "../../models/inputError.model";
import {ChangeEvent, useState} from "react";
import Validator from "../../utils/validator";
import {ordersActions} from "../../redux/Order/order.actions";
import {cartActions} from "../../redux/Cart/cart.actions";

import {CartProduct} from "../../redux/Cart/cart.model";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>()
    const cartTotal: number = useSelector(selectCartTotal);
    const itemCount: number = useSelector(selectCartItemsCount);
    const cartItems: CartProduct[] = useSelector(selectCartItems);
    const errorInitialState = {
        email: {} as InputError,
        address: {} as InputError,
    }

    const email = useFormInput('');
    const address = useFormInput('');
    const [error, setError] = useState(errorInitialState);
    const paperStyle = {
        padding: 20,
        minHeight: '10px',
        width: '50vh',
        margin: "50px auto",
        borderRadius: "30px"
    }

    const validateOrderForm = (): boolean => {
        let isValid = true;
        let inputErrors = { ...errorInitialState };
        if (!Validator.isEmailValid(email.value)) {
            inputErrors.email = {
                hasError: true,
                errorMessage: InputErrorMessage.EMAIL_INPUT_ERROR
            }
            isValid = false;
        }
        if (Validator.isFieldEmpty(address.value)) {
            inputErrors.address = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
            }
            isValid = false;
        }

        setError(inputErrors);
        return isValid;
    }

    const handleCheckout = (event: any) => {
        event.preventDefault();
        if (validateOrderForm()) {
            dispatch(ordersActions.placeOrder(
                email.value,
                cartItems,
                address.value,
                cartTotal));
            dispatch(cartActions.clearCart());
        }
    }

    return (
        <Paper elevation={0} style={paperStyle}>
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
            <Typography variant="h5" component="h5">
                payment and delivery details
            </Typography>
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
                placeholder='Enter Address'
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