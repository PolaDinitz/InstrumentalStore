import CartItem from "./CartItem/CartItem";
import {CartProduct} from "../../redux/Cart/cart.model";
import {useSelector} from "react-redux";
import {selectCartItems, selectCartItemsCount} from "../../redux/Cart/cart.selectors";
import {Box, Container, Paper, Typography} from "@mui/material";
import Checkout from "../Checkout/Checkout";

const Cart = () => {
  const cartProducts: CartProduct[] = useSelector(selectCartItems);
  const itemCount: number = useSelector(selectCartItemsCount);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <Box>
            <Paper color="grey" elevation={0} sx={{ width: "100%", padding: "10px", margin: "10px"}}>
                <Typography variant="h3" component="h3">
                    Your cart
                </Typography>
                <Typography variant="subtitle1" component="h6">
                    Let's check out!
                </Typography>
                { itemCount === 0 &&
                    <Typography variant="h6" component="h6">
                        Your cart is empty!
                    </Typography>
                }
            </Paper>
            {cartProducts.map((item: CartProduct) => (
                <Box key={item._id} sx={{ margin: "5px" }}>
                    <CartItem cartItem={item} />
                </Box>
            ))}
        </Box>
        <Box>
            <Checkout />
        </Box>
    </Box>
  );
}

export default Cart;
