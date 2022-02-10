import {Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {productsActions} from "../../redux/Product/product.actions";
import SingleProduct from "./SingleProduct/SingleProduct";
import {Product} from "../../redux/Product/product.model";

const Catalog = () => {
  const dispatch = useDispatch();
  dispatch(productsActions.loadProducts());

  const allProducts: Product[] = [];

  return (
    // <Container>
      <Grid container spacing={4}>
        {allProducts.map((product: Product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </Grid>
    // </Container>
  );
};

export default Catalog;
