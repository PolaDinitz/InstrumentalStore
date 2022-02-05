import React, {useState} from 'react'
import "react-toastify/dist/ReactToastify.css";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams} from '@mui/x-data-grid';
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import {DialogStateModel} from "../redux/models/dialogState.model";
import {Link} from "react-router-dom";

const ProductsDashboard = () => {
    const [dialogState, setDialogState] = useState({isOpen: false} as DialogStateModel);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 250,
            flex: 1
        },
        {
            field: 'instrumentName',
            headerName: 'Instrument Name',
            width: 250,
            sortable: false,
            flex: 2
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
            valueGetter: (params: GridValueGetterParams) => `${params.row.description || ''}`,
            sortable: false,
            flex: 2
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            flex: 1
        },
        {
            field: 'price',
            headerName: 'Price in $',
            width: 150,
            flex: 1
        },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            width: 150,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => {editProduct(params.row["id"])}}>
                            Edit
                    </Button>
                );
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 150,
            flex: 1,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {deleteProduct(params.row["id"])}}>
                            Delete
                    </Button>
                );
            }
        }
    ];

    const rows = [
        { id: '1', instrumentName: 'Piano', description: 'A nice Piano', category: 'Keyboard', price: 3000 },
        { id: '2', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '3', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '4', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '5', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '6', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '7', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '8', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '9', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '10', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '11', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '12', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '13', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
        { id: '14', instrumentName: 'Classic Guitar', description: 'A nice Guitar', category: 'Guitar', price: 2890 },
    ];

    const deleteProduct = (id: String) => {
        setDialogState({
            isOpen: true,
            confirmCallback: () => confirmDeleteProduct(id),
            cancelCallback: () => handleDialogClose()
        });
    }

    const confirmDeleteProduct = (id: String) => {
        alert(id + " Deleted")
        handleDialogClose();
    }

    const editProduct = (id: String) => {
        alert("Editing " + id)
    }

    const handleDialogClose = () => setDialogState({
        isOpen: false,
        confirmCallback: () => {},
        cancelCallback: () => {},
    });

    const addProduct = () => {
        window.location.replace("/products/add")
    }

    return (
        <Grid item xs={12} sx={{ margin: "50px" }}>
            <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Link to="/products/add" style={{ textDecoration: "none", alignSelf: "self-end", margin: "5px" }}>
                    <Button color="success" variant="contained" onClick={addProduct}>
                        Add Product
                    </Button>
                </Link>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    columnBuffer={8}
                    autoHeight
                    disableSelectionOnClick
                />
            </Paper>
            <Dialog
                open={dialogState.isOpen}
                onClose={handleDialogClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to perform this action?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogState.cancelCallback} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={dialogState.confirmCallback} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default ProductsDashboard;
