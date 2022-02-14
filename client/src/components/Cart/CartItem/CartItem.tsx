import { useDispatch } from "react-redux";
import {
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { CartProduct } from "../../../redux/Cart/cart.model";
import { config } from "../../../config/config";
import { cartActions } from "../../../redux/Cart/cart.actions";

interface CartItemProps {
  cartItem: CartProduct;
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItem = (props: CartItemProps) => {
  const { cartItem } = props;
  const dispatch = useDispatch();

  function removeItem() {
    dispatch(cartActions.removeItem(cartItem));
  }

  function clearItem() {
    dispatch(cartActions.clearItemFromCart(cartItem));
  }

  function addItem() {
    dispatch(cartActions.addItemToCart(cartItem));
  }

  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={config.apiUrl + "/" + cartItem.photoUrl} />
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
            <Grid item sx={{ display: "flex" }}>
              <div style={{ display: 'flex', flexDirection: 'row', margin: '0 auto 0 0' }}>
                <IconButton aria-label="add" onClick={addItem}>
                  <AddIcon />
                </IconButton>
                <div style={{ margin: 'auto' }}>{cartItem.quantity}</div>
                <IconButton aria-label="remove" onClick={removeItem}>
                  <RemoveIcon />
                </IconButton>
              </div>
              <IconButton aria-label="delete" onClick={clearItem} style={{alignContent: "flex-end"}}>
                <DeleteIcon />
              </IconButton>
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
};

export default CartItem;
