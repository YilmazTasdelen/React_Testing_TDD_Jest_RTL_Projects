import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderdetailProvider } from './contexts/OrderDetail'

function App() {
  return (
    <Container>
      <OrderdetailProvider>
        {/*summary and entry page need provider */}
        <OrderEntry />
      </OrderdetailProvider>
      {/*Confirmation page doesnt need provider */}
    </Container>
  );
}

export default App;
