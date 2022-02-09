import { Grid } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config/config";
import { setProducts } from "../../redux/actions/product-actions";
import { Product, RootState } from "../../type";
import SingleProduct from "./SingleProduct/SingleProduct";

const Catalog = () => {

  const allProducts = useSelector((state: RootState) => state.productsState.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
    .get(`${config.apiUrl}/getProducts`)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
    dispatch(setProducts(response.data));
  }

  return (
    // <Container>
      <Grid container spacing={4}>
        {allProducts.map((product: Product) => (
          <SingleProduct key={product.id} item={product} />
        ))}
      </Grid>
    // </Container>
  );
};

export default Catalog;
