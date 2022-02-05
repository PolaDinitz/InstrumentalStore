import {Avatar, Button, ButtonBase, InputAdornment, Paper, TextField, Typography} from '@mui/material';
import {Add as AddIcon, FormatColorText as TextInputIcon, AttachMoney as AttachMoneyIcon} from '@mui/icons-material';
import React, {ChangeEvent, useState} from 'react'
import {Box} from '@mui/system';
import {useDispatch} from 'react-redux';
import {InputError} from '../redux/models/inputError.model';
import Validator from '../utils/validator'
import InputErrorMessage from '../enums/input-error-message';
import "react-toastify/dist/ReactToastify.css";
import {AppDispatch} from '../redux/helpers/store';
import classes from "*.module.css";

const AddProduct = () => {
    const dispatch = useDispatch<AppDispatch>()

    const paperStyle = { 
        padding: 20, 
        minHeight: '10px', 
        width: '35vh', 
        margin: "50px auto",
        borderRadius: "30px"
    }

    const errorInitialState = {
        instrumentName: {} as InputError,
        description: {} as InputError,
        category: {} as InputError,
        price: {} as InputError,
    }

    const instrumentName = useFormInput('');
    const description = useFormInput('');
    const category = useFormInput('');
    const price = useFormInput('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(errorInitialState);

    const handleAddInstrument = (event: any) => {
        event.preventDefault();
        if (validateAddInstrument()) {

        }
    }

    const validateAddInstrument = (): boolean => {
        let isValid = true;
        let inputErrors = {...errorInitialState};
        if (Validator.isFieldEmpty(instrumentName.value)) {
            inputErrors.instrumentName = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
            }
            isValid = false;
        }
        if (Validator.isFieldEmpty(description.value)) {
            inputErrors.description = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
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
                    <Avatar sx={{ bgcolor: 'deepskyblue', width: 56, height: 56 }}><AddIcon/></Avatar>
                    <h1>Add Product</h1>
                </Box>
                <TextField
                    {...instrumentName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><TextInputIcon/></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    type="text"
                    label="Instrument Name"
                    placeholder='Enter instrument name'
                    fullWidth
                    required
                    sx={{margin: "10px"}}
                    error={error?.instrumentName?.hasError}
                    helperText={error?.instrumentName?.hasError ? error.instrumentName.errorMessage : ''}
                />
                <TextField
                    {...description}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><TextInputIcon /></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    minRows="2"
                    multiline
                    label="Description"
                    placeholder='Enter description'
                    fullWidth
                    required
                    sx={{margin: "10px"}}
                    error={error?.description?.hasError}
                    helperText={error?.description?.hasError ? error.description.errorMessage : ''}
                />
                {/*<TextField
                    {...category}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><EmailIcon /></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    type=""
                    label="Email"
                    placeholder='Enter email'
                    fullWidth
                    required
                    sx={{margin: "10px"}}
                    error={error?.email?.hasError}
                    helperText={error?.email?.hasError ? error.email.errorMessage : ''}
                />*/}
                <TextField
                    {...price}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>
                        ),
                    }}
                    variant="filled"
                    type="number"
                    label="Price"
                    placeholder='Enter price in $'
                    fullWidth
                    required
                    sx={{margin: "10px"}}
                    error={error?.price?.hasError}
                    helperText={error?.price?.hasError ? error.price.errorMessage : ''}
                />
                <Typography>
                    Upload image:
                    <input style={{ padding: "5px", margin: "5px" }}
                           accept="image/*"
                           multiple
                           type="file"
                    />
                </Typography>
                <Button
                    sx={{margin: "10px"}}
                    type="submit"
                    variant="contained"
                    onClick={handleAddInstrument}>
                        Add Instrument
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

export default AddProduct;
