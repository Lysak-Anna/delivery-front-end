import { BallTriangle } from "react-loader-spinner";
import { Container } from "./Loader.styled";

export default function Loader() {
  return (
    <Container>
      <BallTriangle
        height={280}
        width={280}
        radius={5}
        color="#f7c200"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </Container>
  );
}
