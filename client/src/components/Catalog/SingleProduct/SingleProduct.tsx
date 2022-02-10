import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import {Product} from "../../../redux/Product/product.model";

interface Props {
  product: Product;
}

const SingleProduct = (props: Props) => {
  const { product } = props;

      return (
        // <Container>
        <Grid item xs={12} sm={6} md={4}>
        {/* <Card sx={{ maxWidth: 345 }}> */}
        <Card>
          <CardMedia
            component="img"
            height="140"
            src={product.photoUrl}
            alt={product.instrumentName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.instrumentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Add To Cart</Button>
          </CardActions>
        </Card>
        </Grid>
        // </Container>
      );
};

export default SingleProduct;
