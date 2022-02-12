import {ordersSelector} from '../../redux/Order/order.selectors';
import {useDispatch, useSelector} from 'react-redux';
import useUpdateEffect from '../../utils/use-update-effect';
import {ordersActions} from '../../redux/Order/order.actions';
import {User} from '../../redux/User/user.model';
import {RootState} from '../../type';
import {
    Box,
    Collapse, Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ItemInOrder, Order} from '../../redux/Order/order.model';
import moment from "moment";

const OrdersHistory = () => {
    const orders: Order[] = useSelector(ordersSelector.selectAll);
    const user: User = useSelector((state: RootState) => state.userState.user)
    const dispatch = useDispatch();

    useUpdateEffect(() => {
        dispatch(ordersActions.loadOrdersByEmail(user.email));
    },[]);

    function Row(props: { row: Order }) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row._id}
                    </TableCell>
                    <TableCell>{row.userEmail}</TableCell>
                    <TableCell>{row.orderAddress}</TableCell>
                    <TableCell>{(moment(row.date)).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell>{row.total}$</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Items
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Instrument name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Total price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.itemList.map((item: ItemInOrder) => (
                                            <TableRow key={item.instrumentName}>
                                                <TableCell component="th" scope="row">
                                                    {item.instrumentName}
                                                </TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{item.price}$</TableCell>
                                                <TableCell>
                                                    {item.quantity * item.price}$
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <Container>
            <Paper color="grey" elevation={0} sx={{ width: "100%", padding: "10px", margin: "10px"}}>
                <Typography variant="h3" component="h3">
                    Order history
                </Typography>
                <Typography variant="subtitle1" component="h6">
                    Check what you have bought from us
                </Typography>
            </Paper>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Order Address</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order: Order) => (
                            <Row key={order._id} row={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default OrdersHistory;
