import CartItem from "./CartItem/CartItem";

interface Item {
  title: string;
  price: number;
  id: string;
  img: string;
  quantity: number;
}

const img_url =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AReact-icon.svg&psig=AOvVaw1ymjZayJQZVjw1P69aS15M&ust=1644081064216000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKjwhLDF5vUCFQAAAAAdAAAAABAD";

const initialState: Item[] = [
  { title: "bla", price: 20, id: "bla1", img: img_url, quantity: 1 },
  { title: "blabla", price: 30, id: "bla2", img: img_url, quantity: 1 },
  { title: "blablabla", price: 40, id: "bla3", img: img_url, quantity: 1 },
  { title: "blablablabla", price: 50, id: "bla4", img: img_url, quantity: 1 },
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
