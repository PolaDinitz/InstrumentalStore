import {useDispatch, useSelector} from "react-redux";
import {selectCartItems, selectCartItemsCount, selectCartTotal} from "../../redux/Cart/cart.selectors";
import {Box, Button, Container, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import InputErrorMessage from '../../enums/input-error-message';
import {AppDispatch, RootState} from "../../type";
import {Email as EmailIcon, FormatColorText as TextInputIcon, House as HouseIcon,} from '@mui/icons-material';
import {InputError} from "../../models/inputError.model";
import React, {ChangeEvent, useState} from "react";
import Validator from "../../utils/validator";
import {ordersActions} from "../../redux/Order/order.actions";
import {cartActions} from "../../redux/Cart/cart.actions";
import {CartProduct} from "../../redux/Cart/cart.model";
import {User} from "../../redux/User/user.model";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>()
    const cartTotal: number = useSelector(selectCartTotal);
    const itemCount: number = useSelector(selectCartItemsCount);
    const cartItems: CartProduct[] = useSelector(selectCartItems);
    const loggedUser: User = useSelector((state: RootState) => state.userState.user);

    const errorInitialState = {
        address: {} as InputError,
    }

    const address = useFormInput('');
    const [error, setError] = useState(errorInitialState);

    const validateOrderForm = (): boolean => {
        let isValid = true;
        let inputErrors = { ...errorInitialState };
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
                loggedUser.email,
                cartItems,
                address.value,
                cartTotal));
            dispatch(cartActions.clearCart());
        }
    }

    return (
        <Paper color="grey" elevation={0} sx={{ width: "100%", padding: "10px", margin: "10px"}}>
            <Box>
                <Typography variant="h3" component="h3">
                    Let's Checkout
                </Typography>
                <Typography variant="subtitle1" component="h6">
                    Your order summary:
                </Typography>
                <Typography variant="subtitle2" component="h6">
                    Order Total: {cartTotal}$
                </Typography>
                <Typography variant="subtitle2" component="h6">
                    Item count: {itemCount}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <Typography variant="h5" component="h5">
                    Payment and delivery details
                </Typography>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><TextInputIcon/></InputAdornment>
                        ),
                    }}
                    disabled
                    defaultValue={loggedUser.firstName}
                    variant="filled"
                    type="text"
                    label="First Name"
                    sx={{margin: "10px"}}
                />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><TextInputIcon /></InputAdornment>
                        ),
                    }}
                    disabled
                    defaultValue={loggedUser.lastName}
                    variant="filled"
                    type="text"
                    label="Last Name"
                    sx={{margin: "10px"}}
                />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><EmailIcon /></InputAdornment>
                        ),
                    }}
                    disabled
                    defaultValue={loggedUser.email}
                    variant="filled"
                    type="text"
                    label="Email"
                    sx={{ margin: "10px" }}
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
                    required
                    disabled={itemCount === 0}
                    sx={{ margin: "10px" }}
                    error={error?.address?.hasError}
                    helperText={error?.address?.hasError ? error.address.errorMessage : ''}
                />
                <Button
                    sx={{ margin: "10px" }}
                    type="submit"
                    variant="contained"
                    disabled={itemCount === 0}
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
