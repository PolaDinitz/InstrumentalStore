import React, {useState} from 'react'
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper, Tooltip
} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams} from '@mui/x-data-grid';
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import {Link, Navigate} from "react-router-dom";
import {DialogStateModel} from "../../models/dialogState.model";
import {Product} from "../../redux/Product/product.model";
import {useDispatch, useSelector} from "react-redux";
import {productsSelector} from "../../redux/Product/product.selector";
import useUpdateEffect from "../../utils/use-update-effect";
import {productsActions} from "../../redux/Product/product.actions";
import AddProduct from "../AddProduct/AddProduct";
import {render} from "react-dom";

const ProductsDashboard = () => {
    const dispatch = useDispatch();
    const [dialogState, setDialogState] = useState({isOpen: false} as DialogStateModel);

    useUpdateEffect(() => {
        dispatch(productsActions.loadProducts());
    },[])

    const columns: GridColDef[] = [
        {
            field: '_id',
            headerName: 'ID',
            width: 250,
            flex: 3
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
            sortable: false,
            flex: 2,
            renderCell: (params: GridRenderCellParams) =>  (
                <Tooltip title={params.row['description']} >
                    <span className="table-cell-tooltip">{params.row['description']}</span>
                </Tooltip>
            ),
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
                    <Link to="/products/edit" style={{ textDecoration: "inherit", color: "inherit" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => {editProduct(params.row["_id"])}}>
                            Edit
                        </Button>
                    </Link>
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
                        onClick={() => {deleteProduct(params.row["_id"])}}>
                            Delete
                    </Button>
                );
            }
        }
    ];

    const rows = useSelector(productsSelector.selectAll);

    const deleteProduct = (id: string) => {
        setDialogState({
            isOpen: true,
            confirmCallback: () => confirmDeleteProduct(id),
            cancelCallback: () => handleDialogClose()
        });
    }

    const confirmDeleteProduct = (id: string) => {
        dispatch(productsActions.deleteProduct(id));
        handleDialogClose();
    }

    const editProduct = (id: string) => {
        dispatch(productsActions.setSelectedProductId(id));
    }

    const handleDialogClose = () => setDialogState({
        isOpen: false,
        confirmCallback: () => {},
        cancelCallback: () => {},
    });

    return (
        <Container>
            <Grid item xs={12} sx={{ margin: "50px" }}>
                <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Link to="/products/add" style={{ textDecoration: "none", alignSelf: "self-end", margin: "5px" }}>
                        <Button color="success" variant="contained">
                            Add Product
                        </Button>
                    </Link>
                    <DataGrid
                        getRowId={row => row._id}
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
        </Container>
    );
}

export default ProductsDashboard;
