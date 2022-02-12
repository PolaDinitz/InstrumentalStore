import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import {Product} from "../../../redux/Product/product.model";
import {config} from "../../../config/config";
import {useDispatch} from "react-redux";
import {cartActions} from "../../../redux/Cart/cart.actions";

interface Props {
  product: Product;
}

const SingleProduct = (props: Props) => {
  const { product } = props;
  const dispatch = useDispatch();

  function addProductToCart() {
    dispatch(cartActions.addItemToCart({
      ...props.product,
      quantity: 1,
    }))
  }

  return (
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              sx={{ objectFit: "contain" }}
              src={config.apiUrl + '/' + product.photoUrl}
              alt={product.instrumentName}
            />
            <CardContent>
              <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.instrumentName}
                </Typography>
                <Chip label={product.category} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions sx={{display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                {product.price}$
              </Typography>
              <Button variant="text" size="small" onClick={addProductToCart}>Add To Cart</Button>
            </CardActions>
          </Card>
        </Grid>
      );
};

export default SingleProduct;
