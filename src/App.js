import {useState} from "react";
import Container from "react-bootstrap/Container";

import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "./pages/confirmation/orderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

import {OrderDetailsProvider} from "./contexts/OrderDetails";

import style from './App.module.css'
function App() {
  const [users, setUsers] = useState([
      {name: 'Inna', email: 'inna@inna.com'}
  ])
    const [orderPhase, setOrderPhase] = useState('inProgress')

    let Component = OrderEntry
    switch (orderPhase){
        case 'inProgress':
            Component = OrderEntry
            break;
        case 'review':
            Component = OrderSummary
            break
        case 'completed':
            Component = OrderConfirmation
            break
        default:
    }

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
      <Container>
          <SummaryForm />
          <OrderDetailsProvider>
              {/*<OrderEntry />*/}
              <Component setOrderPhase={setOrderPhase} />
          </OrderDetailsProvider>

        <div className={style.app}>
            <h2>learn react</h2>
            <UserForm onUserAdd={onUserAdd} />
            <hr/>
            <UserList users={users} />
        </div>
      </Container>
  );
}

export default App;
