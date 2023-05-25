import ProductCard from "../ProductCard/ProductCard";
import { Item, List } from "./CardList.styled";

export default function CardList({ list }) {
  return (
    <section>
      <List>
        {list &&
          list.map(({ image, name, price, _id, category }) => (
            <Item key={_id}>
              <ProductCard
                image={image}
                price={price}
                name={name}
                id={_id}
                category={category}
              />
            </Item>
          ))}
      </List>
    </section>
  );
}
