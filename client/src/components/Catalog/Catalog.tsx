import _ from 'lodash';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { productsActions } from "../../redux/Product/product.actions";
import SingleProduct from "./SingleProduct/SingleProduct";
import { Product } from "../../redux/Product/product.model";
import useUpdateEffect from "../../utils/use-update-effect";
import { productsSelector } from "../../redux/Product/product.selector";


const Catalog = () => {
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    dispatch(productsActions.loadProducts());
  }, []);

  const allProducts: Product[] = useSelector(productsSelector.selectAll);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = allProducts.filter((product: Product) => {
    return (
      product.instrumentName
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      product.category
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Paper
        color="grey"
        elevation={0}
        sx={{ width: "100%", padding: "10px", margin: "10px" }}
      >
        <Typography variant="h3" component="h3">
          Instruments Catalog
        </Typography>
        <Typography variant="subtitle1" component="h6">
          Browse, Click and Shop!
        </Typography>
      </Paper>
      <Paper
        component="form"
        elevation={2}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <InputBase
          onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={handleSearch}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container spacing={4}>
        {!_.isEmpty(filteredProducts) ? filteredProducts.map((product: Product) => (
          <SingleProduct key={product._id} product={product} />
        )) : <Typography variant="h5" margin="30px">Oops, couldn't find any products</Typography>}
      </Grid>
    </Container>
  );
};

export default Catalog;
