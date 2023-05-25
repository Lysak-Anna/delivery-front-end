import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

const Restaurants = lazy(() => import("./pages/Restaurants/Restaurants"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Restaurants />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
