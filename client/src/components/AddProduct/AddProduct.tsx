import {
    Avatar,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import {Add as AddIcon, AttachMoney as AttachMoneyIcon, FormatColorText as TextInputIcon} from '@mui/icons-material';
import React, {ChangeEvent, useState} from 'react'
import {Box} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import Validator from '../../utils/validator'
import InputErrorMessage from '../../enums/input-error-message';
import "react-toastify/dist/ReactToastify.css";
import useUpdateEffect from "../../utils/use-update-effect";
import {AppDispatch, RootState} from "../../type";
import {categoryActions} from "../../redux/Category/category.actions";
import {InputError} from "../../models/inputError.model";
import {Category} from "../../redux/Category/category.model";
import {userActions} from "../../redux/User/user.actions";
import {productsActions} from "../../redux/Product/product.actions";

const AddProduct = () => {
    const dispatch = useDispatch<AppDispatch>()

    useUpdateEffect(() => {
        dispatch(categoryActions.loadCategories())
    },[])

    const categories = useSelector((state: RootState) => state.categoryState.categories);

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
    const price = useFormInput('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(undefined);
    const [error, setError] = useState(errorInitialState);

    const handleAddInstrument = (event: any) => {
        event.preventDefault();
        if (validateAddInstrument()) {
            dispatch(productsActions.addProduct({
                instrumentName: instrumentName.value,
                description: description.value,
                category: category,
                price: +price.value,
            }, image));
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
        if (Validator.isFieldEmpty(category)) {
            inputErrors.category = {
                hasError: true,
                errorMessage: InputErrorMessage.EMPTY_INPUT_ERROR
            }
            isValid = false;
        }
        if (!Validator.isPriceValid(+price.value)) {
            inputErrors.price = {
                hasError: true,
                errorMessage: InputErrorMessage.PRICE_INPUT_ERROR
            }
            isValid = false;
        }
        setError(inputErrors);
        return isValid;
    }

    const onSelectCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    const onSelectImage = (event: any) => {
        setImage(event.target.files[0])
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
                <FormControl
                    fullWidth
                    variant="filled"
                    required
                    error={error?.category?.hasError}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select-label"
                        value={category}
                        label="Category"
                        onChange={onSelectCategory}
                    >
                    {categories.map((category: Category) => (
                        <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                    ))}
                    </Select>
                    {error?.category?.hasError && <FormHelperText>{error.category.errorMessage}</FormHelperText>}
                </FormControl>
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
                           type="file"
                           onChange={onSelectImage}
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

const useFormInput = (initialValue: string) => {
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
