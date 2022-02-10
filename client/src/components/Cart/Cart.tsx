import CartItem from "./CartItem/CartItem";
import {CartProduct} from "../../redux/Cart/cart.model";

const img_url =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AReact-icon.svg&psig=AOvVaw1ymjZayJQZVjw1P69aS15M&ust=1644081064216000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjwhLDF5vUCFQAAAAAdAAAAABAD";

const initialState: CartProduct[] = [
  { instrumentName: "bla", description: "bla", category: "Drums", price: 20, id: "bla1", photoUrl: img_url, quantity: 1 },
  { instrumentName: "blabla", description: "bla", category: "Drums", price: 30, id: "bla2", photoUrl: img_url, quantity: 1 },
  { instrumentName: "blablabla", description: "bla", category: "Drums", price: 40, id: "bla3", photoUrl: img_url, quantity: 1 },
  { instrumentName: "blablablabla", description: "bla", category: "Drums", price: 50, id: "bla4", photoUrl: img_url, quantity: 1 },
];

const Cart = () => {
  return (
    <div>
      {initialState.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
  );
}

export default Cart;
