import {Order} from '../../redux/Order/order.model';
import {ordersSelector} from '../../redux/Order/order.selectors';
import { useSelector, useDispatch } from 'react-redux';
import useUpdateEffect from '../../utils/use-update-effect';
import { ordersActions } from '../../redux/Order/order.actions';
import { User } from '../../redux/User/user.model';
import { RootState } from '../../type';

const OrdersHistory = () => {
    const orders: Order[] = useSelector(ordersSelector.selectAll);
    const user: User = useSelector((state: RootState) => state.userState.user)
    const dispatch = useDispatch();

    useUpdateEffect(() => {
        dispatch(ordersActions.loadOrdersByEmail(user.email));
    },[]);

    return (
        <div>
            <h1>Order OrdersHistory</h1>
            {orders.map((order : Order) => {
                return (
    <div key={order._id}> {order._id} {order.date} {order.userEmail} {order.orderAddress}
    </div>

                );
            })}
        </div>
    );
}

export default OrdersHistory;
