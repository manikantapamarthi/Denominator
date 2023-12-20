import { Container } from "react-bootstrap";
import Denominator from "./Denominator"



function App() {
  return (
    <div>
      <Container className="border border-primary bg-warning">
        <h1 className="text-center mb-5 text-dark">Denominator</h1>
        <Denominator/>
      </Container>
    </div>
  );
}

export default App;
