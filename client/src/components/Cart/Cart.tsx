import CartItem from "./CartItem/CartItem";
import {CartProduct} from "../../redux/Cart/cart.model";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../redux/Cart/cart.selectors";
import {Box, Container, Paper, Typography} from "@mui/material";

const Cart = () => {
  const cartProducts: CartProduct[] = useSelector(selectCartItems);
  return (
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <Paper color="grey" elevation={0} sx={{ width: "100%", padding: "10px", margin: "10px"}}>
        <Typography variant="h3" component="h3">
          Your cart
        </Typography>
        <Typography variant="subtitle1" component="h6">
          Let's check out!
        </Typography>
      </Paper>
      {cartProducts.map((item: CartProduct) => (
          <Box key={item._id} sx={{ margin: "5px" }}>
            <CartItem cartItem={item} />
          </Box>
      ))}
    </Container>
  );
}

export default Cart;
