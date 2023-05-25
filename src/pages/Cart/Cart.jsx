import CustomerForm from "../../components/CustomerForm/CustomerForm";
import Map from "../../components/Map/Map";
import { Container } from "./../Restaurants/Restaurants.styled";

export default function Cart() {
  return (
    <main>
      <Container>
        <Map />
        <CustomerForm />
      </Container>
    </main>
  );
}
