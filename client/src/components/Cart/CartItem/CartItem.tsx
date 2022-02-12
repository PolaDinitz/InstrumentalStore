import {Button, ButtonBase, Grid, Paper, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
import {CartProduct} from "../../../redux/Cart/cart.model";
import {config} from "../../../config/config";
import {useDispatch} from "react-redux";
import {cartActions} from "../../../redux/Cart/cart.actions";

interface CartItemProps {
  cartItem: CartProduct;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = (props: CartItemProps) => {
  const { cartItem } = props;
  const dispatch = useDispatch();

  function removeItem() {
    dispatch(cartActions.removeItem(cartItem))
  }

  function clearItem() {
    dispatch(cartActions.clearItemFromCart(cartItem))
  }

  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={config.apiUrl + '/' + cartItem.photoUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {cartItem.instrumentName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {cartItem.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {cartItem.quantity}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {cartItem.price}$
              </Typography>
            </Grid>
            <Grid item sx={{display: "flex"}}>
              <Button onClick={removeItem} variant="outlined" size="small" sx={{ margin: "5px" }} color="error">
                Remove one
              </Button>
              <Button onClick={clearItem} variant="contained" size="small" sx={{ margin: "5px" }} color="error">
                Remove all
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Total: {cartItem.quantity * cartItem.price}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;
